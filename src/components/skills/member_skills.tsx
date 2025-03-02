import { useParams } from "react-router-dom";
import { fetchMemberByUuid } from "./../../service/members/members";
import Header from "../common/Header";
import { useEffect, useState } from "react";
import { getMemberByMasterSkills } from "../../service/skills/masterSkills";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useLocation, useNavigate } from "react-router-dom";
import SampleImage from "./../../assets/sample_profile.png";

import "./member_skills.scss";
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
      <div>
        <h3>
          Members with the skill :{" "}
          <span className="skill_name_span">{data[0]?.skill_name}</span>
        </h3>
      </div>
      <div className="card">
        <DataTable
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={10}
        >
          <Column
            field=""
            header="Sr No"
            body={(row, options) => {
              return <>{options.rowIndex + 1}</>;
            }}
          ></Column>

          <Column
            field="name"
            header="Name"
            body={(row) => {
              return (
                <>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      navigation("/profile/" + row.member_uuid);
                    }}
                  >
                    {row.name}
                  </a>
                </>
              );
            }}
          ></Column>
          <Column
            field=""
            header=""
            body={(row, options) => {
              return (
                <>
                  <img src={SampleImage} height={70} width={70} />
                </>
              );
            }}
          ></Column>
          <Column
            field="Experience"
            header="Experience"
            body={(row, options) => {
              // Generate random number of years between 2 and 6
              const years = Math.floor(Math.random() * (6 - 2 + 1)) + 2;

              // Generate random number of months between 0 and 11
              const months = Math.floor(Math.random() * 12);

              return (
                <>
                  {years} years {months} months
                </>
              );
            }}
          ></Column>
          <Column
  field=""
  header="Also knows"
  body={(row, options) => {
    // List of skills or technologies
    const skills = ["HTML/CSS", "UI", "Java", "JavaScript", "SAP", "DevOps"];

    // Pick a random skill from the list
    const randomSkill = skills[Math.floor(Math.random() * skills.length)];

    return (
      <>
        {randomSkill}
      </>
    );
  }}
></Column>
        </DataTable>
      </div>
    </>
  );
};

export default MemberSkills;
