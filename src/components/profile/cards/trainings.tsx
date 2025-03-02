import { useAtom } from "jotai";
import { IsMyprofileDataAtom } from "../../../atoms/my_profile";

const TrainingsCard = () => {
  const [isMyProfile] = useAtom(IsMyprofileDataAtom);

    return (
      <>
        <div className="box-card">

        <div style={{ display: "flex" }}>
          {isMyProfile}
          {(isMyProfile) && (
        
        <i className="pi pi-pencil"  onClick={() => {
          // setVisibleSkillsetModal(true);
        }} style={{ color: '#d3020e',marginLeft: "auto" }}></i>
        )}
          

          {/* <Dialog
              header="Update Skillsets"
              visible={visibleSkillsetModal}
              style={{ width: "50vw" }}
              onHide={() => {
                if (!visibleSkillsetModal) return;
                setVisibleSkillsetModal(false);
              }}
            >
              <SkillsetModal skills={skills}/>
            </Dialog> */}


        </div>

            <div><b>Webinars/Trainings</b><i className="pi pi-link" style={{color:"#d3020e",marginLeft:"5px"}}></i></div>
            <div>Total : 15</div>
            <div>Current Year : 7</div>
            <div>Current Quarter : 2</div> 


        </div>
      </>
    );
  };
  
  export default TrainingsCard;
  