import { useParams } from "react-router-dom";
import Header from "../common/Header";
import ProjectHeader from "./project_header";
import ProjectSection from "./project_section";
import { useEffect, useState } from "react";
import { fetchProjectByUuid, fetchProjectMembersByUuid } from "../../service/project/project_service";

const Project = () =>{
  const { uuid } = useParams(); // Get the uuid from the route params
  const [data,setData] = useState([]);
  const [ProjectMembers,setProjectMembers] = useState([])
  useEffect(() => {
    async function fetchProject() {
      try {
        let Alldata;
        let membersData;
        if (uuid) {
          // Fetch data by UUID if it's available
          Alldata = await fetchProjectByUuid(uuid);
          membersData = await fetchProjectMembersByUuid(uuid);
          setProjectMembers(membersData)
          setData(Alldata);
        } else {
          // Fetch the user's own profile, assume a function exists
          // data = await fetchOwnProfile();
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    }

    fetchProject();
  }, [uuid]);
  console.log(ProjectMembers);
    return <>
        <Header/>
        <ProjectHeader projectData={data}/>
        <ProjectSection ProjectMembers={ProjectMembers}/>
    </>
}

export default Project;