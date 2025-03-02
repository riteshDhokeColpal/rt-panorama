import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useState } from 'react';
import { fetchMemberSkillsByUuid } from '../../../service/skills/memberSkills';
import { useAtom } from 'jotai';
import { profileDataAtom } from '../atoms/micro_level_member_atoms';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { createAssist } from '../../../service/assists/assists_service';
const RequestAssistModal = (props) =>{
    const [selectedSkills, setSelectedSkills] = useState(null);
    const [skills, setSkills] = useState([]);
    const [profileData] = useAtom(profileDataAtom);

    const [desc, setDesc] = useState("");
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("Skills,Topic & Description are required");
    useEffect(()=>{
        async function getSkills() {
            try {
              const skillsData = await fetchMemberSkillsByUuid(profileData?.uuid);
              setSkills(skillsData);
            } catch (err) {
            //   setError('Failed to fetch skills');
            }
          }

          getSkills();
    },[profileDataAtom])

    const handleAssistForm = async () => {
        if (selectedSkills && desc && topic) {
          // call api to insert assist
          // current user uuid, and assisted by
        //   const current_user_uuid = profileData.uuid; //assisted_to_uuid
        //   const assist_by_uuid = uuid; //member_uuid
        //   const currentTimestamp = Math.floor(Date.now() / 1000);
    
          props.toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "You Assist Request has been sent via google chat to "+profileData.name,
            life: 30000,
          });
          props.setVisibleAssistModal(false)
        } else {
          setMessage("Skills,Topic & Description are required");
        }
      };
    
    return <>


    <div className="card">
        {topic !== "" && desc !== "" ? null : ( // or whatever component you want to render when the condition is true
          <Message
            severity="error"
            text={message}
            style={{ marginBottom: "1rem" }}
          />
        )}
        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label style={{marginRight:"2rem"}}>Skills Set </label>
          <MultiSelect value={selectedSkills} onChange={(e) => setSelectedSkills(e.value)} options={skills} optionLabel="name" 
                placeholder="Select Skillsets" maxSelectedLabels={3} className={`w-full md:w-20rem ${selectedSkills ? "" : "p-invalid"}`} />
        </div>
        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label style={{marginRight:"0.6rem"}}>Assist Topic </label>
          <InputText
            id="username"
            autoComplete='off'
            placeholder="Topic"
            className={`${topic ? "" : "p-invalid"} mr-2`}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap align-items-center gap-2">
          <label style={{marginRight:"1rem"}}>Description </label>

          <InputTextarea
            autoResize
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={5}
            cols={30}
            placeholder="Description"
            className={`${desc ? "" : "p-invalid"} mr-2`}
          />
        </div>
        <div
          className="flex flex-wrap align-items-center gap-2"
          style={{ justifyContent: "center", marginTop: "1rem" }}
        >
          <Button label="Submit" onClick={handleAssistForm} />
        </div>
      </div>
    </>
}

export default RequestAssistModal