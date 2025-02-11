import { Button } from "primereact/button";
import SampleImage from "./../../assets/sample_profile.png";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import GiveAssistModal from "./modals/give_assist_modal";
import ProfilEditModal from "./modals/profile_edit_modal";
const ProfileHeader = () => {
  const [visibleAssistModal, setVisibleAssistModal] = useState(false);
  const [visibleProfileModal, setVisibleProfileModal] = useState(false);

  return (
    <>
      <div>
        <div style={{ display: "flex", border: "1px solid red" }}>
          <div className="mr-10rem">
            <img src={SampleImage} height={200} width={200} />
            <div>Email icon</div>
          </div>
          <div className="mr-10rem">
            <div>Sample Name</div>
            <div>Project Manager</div>
            <div>Location - City</div>
            <div>People Manager</div>
          </div>
          <div className="mr-10rem">
            <div>Status - full time employee</div>
            <div>Primary Skills - DevOps</div>
            <div>
              <Button
                label="Give Thank you"
                size="small"
                onClick={() => {
                  setVisibleAssistModal(true);
                }}
              />
            </div>
            <Dialog
              header="Give Thank you"
              visible={visibleAssistModal}
              style={{ width: "50vw" }}
              onHide={() => {
                if (!visibleAssistModal) return;
                setVisibleAssistModal(false);
              }}
            >
              <GiveAssistModal />
            </Dialog>
          </div>
          <div
            className="mr-10rem"
            style={{ position: "absolute", right: 0, marginTop: "1rem" }}
          >
            <div>
              <button onClick={() => {
                  setVisibleProfileModal(true);
                }}>Edit</button>

              <Dialog
              header="Edit Profile"
              visible={visibleProfileModal}
              style={{ width: "50vw" }}
              onHide={() => {
                if (!visibleProfileModal) return;
                setVisibleProfileModal(false);
              }}
            >
              <ProfilEditModal />
            </Dialog>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
