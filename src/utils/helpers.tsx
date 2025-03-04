export const transformApiResponseToTreeData = (apiResponse) => {
    if (!apiResponse || !apiResponse.project || !Array.isArray(apiResponse.members)) {
        // Check if the API response structure is valid
        return [];
      }
    // Destructure project and members from the response
    const { project, members } = apiResponse;
  
    // Map project and members to tree data
    const treeData = [
      {
        expanded: true,
        label: project?.name,
        className: "text-white",
        style: { borderRadius: "12px",backgroundColor:"#d3020e" },
        children: members?.map((member) => ({
          expanded: true,
          type: "person",
          // className: "text-white",
          style: { borderRadius: "12px",backgroundColor:"#fff",color:'#d3020e',border:'1px solid #d3020e'  },
          data: {
            image: "https://primefaces.org/cdn/primereact/images/avatar/annafali.png", // Placeholder image URL
            name: member.name,
            title: member.designation,
            uuid: member.uuid,
          },
          children: member.skills.filter(skill => skill).map((skill, index) => ({
            label: skill || `Skill ${index + 1}`,
            skill_uuid:member.skill_uuid[index],
            // className: "text-white",
            style: { borderRadius: "12px",backgroundColor:"#fff",color:'#d3020e',border:'1px solid #d3020e' },
          })),
        })),
      },
    ];
  
    return treeData;
  };




  export function convertTimestampAndCalculateDifference(unixTimestamp) {
    const inputDate = new Date(unixTimestamp * 1000);
    const today = new Date();

    // Format the date into "dd Mmm yyyy"
    const day = String(inputDate.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    // Calculate the difference in years and months
    let yearsDifference = today.getFullYear() - inputDate.getFullYear();
    let monthsDifference = today.getMonth() - inputDate.getMonth();

    if (monthsDifference < 0) {
        yearsDifference--;
        monthsDifference += 12;
    }

    const differenceString = `${yearsDifference} years ${monthsDifference} months`;

    return [formattedDate, differenceString];
}

export function convertUnixToYearMonth(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  const year = date.getFullYear();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  
  return `${year} ${month}`;
}

export function convertUnixToMonthFullYear(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  const year = date.getFullYear();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[date.getMonth()];
  
  return `${month} ${year}`;
}
export function calculateDateDifference(startTimestamp, endTimestamp) {
  const startDate = new Date(startTimestamp * 1000); // Convert to milliseconds
  const endDate = new Date(endTimestamp * 1000); // Convert to milliseconds

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  // Adjust for cases where the end month is earlier than the start month
  if (months < 0) {
      years -= 1;
      months += 12;
  }

  return `${years} years ${months} months`;
}

export function getAssistStats(apiResponse) {
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const currentQuarter = Math.floor(currentTime.getMonth() / 3) + 1;

  let totalAssists = 0;
  let assistsInCurrentYear = 0;
  let assistsInCurrentQuarter = 0;

  apiResponse.forEach(assist => {
      totalAssists++;

      // Convert Unix timestamp to Date object
      const assistDate = new Date(assist.date_assist * 1000);
      const assistYear = assistDate.getFullYear();
      const assistQuarter = Math.floor(assistDate.getMonth() / 3) + 1;

      if (assistYear === currentYear) {
          assistsInCurrentYear++;
          if (assistQuarter === currentQuarter) {
              assistsInCurrentQuarter++;
          }
      }
  });

  return [totalAssists, assistsInCurrentYear, assistsInCurrentQuarter];
}