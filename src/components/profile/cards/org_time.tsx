import { useAtom } from "jotai";
import { profileDataAtom } from "../atoms/micro_level_member_atoms";
import { convertTimestampAndCalculateDifference } from "../../../utils/helpers";

const OrgTime = () => {
  const [profileData] = useAtom(profileDataAtom);
  const user_org_dates_array = convertTimestampAndCalculateDifference(profileData?.org_joining_date);
    return (
      <>
        <div className="box-card">
          <b>In Organisation</b><i className="pi pi-sitemap" style={{color:"#d3020e",marginLeft:"5px"}}></i>
          <div>Since {user_org_dates_array[1]}</div>
          {/* <div>Joined {user_org_dates_array[0]}</div> */}
        </div>
      </>
    );
  };
  
  export default OrgTime;
  