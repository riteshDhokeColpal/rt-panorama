import { useParams } from "react-router-dom";
import { fetchPastProjectsOfMemberByUUID } from "../../service/project/project_service";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { calculateDateDifference, convertUnixToYearMonth } from "../../utils/helpers";
import { Button } from "primereact/button";
import { useAtom } from "jotai";
import { IsMyprofileDataAtom, MyprofileDataAtom } from "../../atoms/my_profile";

const PastProject = () => {
  const [isMyProfile] = useAtom(IsMyprofileDataAtom);
  const [profileData] = useAtom(MyprofileDataAtom);


  const { uuid } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {

    async function fetchPastProjects() {
      try {
        let Alldata;
        if (uuid) {
          // Fetch data by UUID if it's available
          Alldata = await fetchPastProjectsOfMemberByUUID(uuid);
          setData(Alldata);
        } else {
          if(profileData?.uuid){
            Alldata = await fetchPastProjectsOfMemberByUUID(profileData?.uuid);
            setData(Alldata);
          }
          // Fetch the user's own profile, assume a function exists
          // data = await fetchOwnProfile();
          // Alldata = await fetchPastProjectsOfMemberByUUID(uuid);
          // setData(Alldata);
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    }

    fetchPastProjects();
  }, [uuid]);
  return (
    <>
      
          <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Project Name"></Column>
                <Column field="start_date" header="Project Onboard" body={(row)=>{
                  return <>
                    {convertUnixToYearMonth(row.start_date)}
                  </>
                }}></Column>
                <Column field="end_date" header="Project Exit" body={(row)=>{
                  return <>
                    {convertUnixToYearMonth(row.end_date)}
                  </>
                }}></Column>
                <Column field="end_date" header="Time in Project" body={(row)=>{
                  return <>
                  {calculateDateDifference(row.start_date,row.end_date)}
                  </>
                }}></Column>
                <Column field="github_repo_url" header="Git Repo" body={(row)=>{
                  return <>
                  <a href={row.github_repo_url}>{row.name}</a>
                  </>
                }}></Column>
            </DataTable>
    </>
  );
};



export default PastProject;
