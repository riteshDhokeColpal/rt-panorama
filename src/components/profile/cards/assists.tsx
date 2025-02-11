import { Dialog } from "primereact/dialog";
import { useState } from "react";
import ViewAssistModal from "../modals/view_assists";

const AssistCard = () => {
  const [visibleViewAssistModal,setVisibleViewAssistsetModal] = useState(false);
    return (
      <>
        <div className="box-card">
        <div style={{ display: "flex" }}>
          <button
            style={{ marginLeft: "auto" }}
            onClick={() => {
              setVisibleViewAssistsetModal(true);
            }}
          >
            Edit
          </button>

          <Dialog
              header="View Assists"
              visible={visibleViewAssistModal}
              style={{ width: "50vw" }}
              onHide={() => {
                if (!visibleViewAssistModal) return;
                setVisibleViewAssistsetModal(false);
              }}
            >
              <ViewAssistModal />
            </Dialog>


        </div>
          <div>Total 15 Assist in Year</div>
          <div>2 New Assist this Quarter</div>

        </div>
      </>
    );
  };
  
  export default AssistCard;
  