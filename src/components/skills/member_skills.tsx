import { useParams } from "react-router-dom";
import { fetchMemberByUuid } from "./../../service/members/members";
import Header from "../common/Header";
import { useEffect, useState } from "react";
import { getMemberByMasterSkills } from "../../service/skills/masterSkills";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {useLocation,useNavigate} from 'react-router-dom';

const MemberSkills = () => {
  const { uuid } = useParams(); // Get the uuid from the route params
  const [data, setData] = useState([]);
  const navigation = useNavigate();


  useEffect(() => {

    async function fetchProfile() {
      try {
        let Alldata;
        if (uuid) {
          // Fetch data by UUID if it's available
          Alldata = await getMemberByMasterSkills(uuid);
          setData(Alldata);
        } else {
          // Fetch the user's own profile, assume a function exists
          // data = await fetchOwnProfile();
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    }

    fetchProfile();
  }, [uuid]);

  return (
    <>
      <Header />

      <div className="card">
        <DataTable
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={10}
        >
          <Column field="name" header="Name" body={(row)=>{
            return <>
              <a href="javascript:void(0);" onClick={() =>{
                navigation('/profile/'+row.member_uuid)
              }}>{row.name}</a>
            </>
          }}></Column>
        </DataTable>
      </div>
    </>
  );
};

export default MemberSkills;
