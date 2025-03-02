import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";

import { InputTextarea } from "primereact/inputtextarea";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useAtom } from "jotai";
import { MyprofileDataAtom } from "../../../atoms/my_profile";
import { useParams } from "react-router-dom";
import { createAssist } from "../../../service/assists/assists_service";
import { Toast } from "primereact/toast";

const GiveAssistModal = (props) => {
  
  const [desc, setDesc] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("Topic & Description are required");

  const [profileData] = useAtom(MyprofileDataAtom);
  const { uuid } = useParams(); // Get the uuid from the route param

  const handleAssistForm = async () => {
    if (desc && topic) {
      // call api to insert assist
      // current user uuid, and assisted by
      const current_user_uuid = profileData.uuid; //assisted_to_uuid
      const assist_by_uuid = uuid; //member_uuid
      const currentTimestamp = Math.floor(Date.now() / 1000);

      try {
        const skillsData = await createAssist({
          member_uuid: assist_by_uuid,
          assisted_to_uuid: current_user_uuid,
          description: desc,
          topic: topic,
          date_assist: currentTimestamp,
        });
        props.toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Your assistance entry has been successfully submitted",
          life: 30000,
        });
        props.setVisibleAssistModal(false)
      } catch (err) {
        setMessage("Something went wrong, please try again!");
      }
    } else {
      setMessage("Topic & Description are required");
    }
  };
  return (
    <>
      <div className="card">
        {topic !== "" && desc !== "" ? null : ( // or whatever component you want to render when the condition is true
          <Message
            severity="error"
            text={message}
            style={{ marginBottom: "1rem" }}
          />
        )}

        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label style={{marginRight:"2rem"}}>Assist Topic </label>
          <InputText
            id="username"
            placeholder="Topic"
             autoComplete="off"
            className={`${topic ? "" : "p-invalid"} mr-2`}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap align-items-center gap-2">
          <label style={{marginRight:"2.3rem"}}>Description </label>

          <InputTextarea
           autoComplete="off"
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
  );
};

export default GiveAssistModal;
