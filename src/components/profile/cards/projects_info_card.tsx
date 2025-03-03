import { useAtom } from "jotai";
import { IsMyprofileDataAtom } from "../../../atoms/my_profile";

const ProjectInfoCard = () => {
  const [isMyProfile] = useAtom(IsMyprofileDataAtom);

  return (
    <>

        <div style={{ display: "flex" }}>
          {isMyProfile}
          {(isMyProfile) && (
        
        <i className="pi pi-pencil"  onClick={() => {
          // setVisibleSkillsetModal(true);
        }} style={{ color: '#d3020e',marginLeft: "auto" }}></i>
        )}
          


        </div>
          <div><b>Current Project</b><i className="pi pi-briefcase" style={{color:"#d3020e",marginLeft:"5px"}}></i></div>
          <div>Pilot Nexus</div>

    </>
  );
};

export default ProjectInfoCard;
