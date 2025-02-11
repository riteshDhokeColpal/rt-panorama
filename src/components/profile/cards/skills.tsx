import { useState } from "react";
import SkillsetModal from "../modals/skillset_modal";
import { Dialog } from "primereact/dialog";

const SkillCard = () => {
  const [visibleSkillsetModal, setVisibleSkillsetModal] = useState(false);

  return (
    <>
      <div className="box-card">
        <div style={{ display: "flex" }}>
          <button
            style={{ marginLeft: "auto" }}
            onClick={() => {
              setVisibleSkillsetModal(true);
            }}
          >
            Edit
          </button>

          <Dialog
              header="Edit Profile"
              visible={visibleSkillsetModal}
              style={{ width: "50vw" }}
              onHide={() => {
                if (!visibleSkillsetModal) return;
                setVisibleSkillsetModal(false);
              }}
            >
              <SkillsetModal />
            </Dialog>


        </div>
        <div> Javascript</div>
        <div> UX</div>
        <div> DevOps</div>
      </div>
    </>
  );
};

export default SkillCard;
