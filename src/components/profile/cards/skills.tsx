import { useEffect, useState } from "react";
import SkillsetModal from "../modals/skillset_modal";
import { Dialog } from "primereact/dialog";
import { fetchMemberSkillsByUuid } from './../../../service/skills/memberSkills';
import { useAtom } from "jotai";
import { profileDataAtom } from "../atoms/micro_level_member_atoms";
import { IsMyprofileDataAtom } from "../../../atoms/my_profile";
import { useParams } from "react-router-dom";
const SkillCard = () => {
  const [profileData] = useAtom(profileDataAtom);
  const [visibleSkillsetModal, setVisibleSkillsetModal] = useState(false);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  const [memberUuid] = useState(profileData?.uuid);
  const [isMyProfile] = useAtom(IsMyprofileDataAtom);
  const { uuid } = useParams(); // Get the uuid from the route params

  useEffect(() => {

    async function getSkills() {
      let uuid_state = '';
      if(isMyProfile){
        uuid_state = profileData?.uuid;
      }else{
        uuid_state = uuid
      }
      try {
        const skillsData = await fetchMemberSkillsByUuid(uuid_state);
        setSkills(skillsData);
      } catch (err) {
        setError('Failed to fetch skills');
      }
    }

    if (memberUuid) {
      getSkills();
    }
  }, [memberUuid,profileData]);
  return (
    <>
      <div className="box-card">
        <div style={{ display: "flex" }}>
          {isMyProfile}
          {(isMyProfile) && (
        
        <i className="pi pi-pencil"  onClick={() => {
          setVisibleSkillsetModal(true);
        }} style={{ color: '#d3020e',marginLeft: "auto" }}></i>
        )}
          

          <Dialog
              header="Update Skillsets"
              visible={visibleSkillsetModal}
              style={{ width: "50vw" }}
              onHide={() => {
                if (!visibleSkillsetModal) return;
                setVisibleSkillsetModal(false);
              }}
            >
              <SkillsetModal skills={skills}/>
            </Dialog>


        </div>
        <b>Skills</b><i className="pi pi-file-check" style={{color:"#d3020e",marginLeft:"5px"}}></i>
        <ul style={{listStyleType:"none",padding:0}}>
        {skills.map(skill => (
          <li key={skill?.name}>{skill?.name}</li>
        ))}
      </ul>
      </div>
    </>
  );
};

export default SkillCard;
