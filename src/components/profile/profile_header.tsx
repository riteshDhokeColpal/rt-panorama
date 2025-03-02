import { Button } from "primereact/button";
import { useAtom } from "jotai";
import { profileDataAtom } from "./atoms/micro_level_member_atoms";
import SampleImage from "./../../assets/sample_profile.png";
import { Dialog } from "primereact/dialog";
import { useRef, useState } from "react";
import GiveAssistModal from "./modals/give_assist_modal";
import ProfilEditModal from "./modals/profile_edit_modal";
import RequestAssistModal from "./modals/request_modal";
import { IsMyprofileDataAtom } from "../../atoms/my_profile";
import { Toast } from "primereact/toast";

const ProfileHeader = () => {
  const [visibleAssistModal, setVisibleAssistModal] = useState(false);
  const [visibleRequestAssistModal, setVisibleRequestAssistModal] =
    useState(false);
  const [visibleProfileModal, setVisibleProfileModal] = useState(false);
  const [profileData] = useAtom(profileDataAtom);
  const [isMyProfile] = useAtom(IsMyprofileDataAtom);
  const toast = useRef(null);
  return (
    <>
    <Toast ref={toast} />
      <div>
        <div style={{ display: "flex", border: "1px solid #d3020e",borderRadius:"10px" }}>
          <div className="mr-10rem">
            <img src={SampleImage} height={200} width={200} />
            <div>
              <i
                className="pi pi-envelope"
                style={{ fontSize: "1rem", cursor: "pointer",color:"#d3020e" }}
                onClick={() =>
                  (window.location.href = `mailto:${profileData.email}`)
                }
              ></i>
            </div>
          </div>
          <div className="mr-10rem" style={{alignContent: "center",textAlign:"start"}}>
            <div>Name : <span style={{fontWeight:"bold"}}>{profileData?.name}</span></div>
            <div>Designation: <span style={{fontWeight:"bold"}}>{profileData?.designation}</span></div>
            <div>Location: <span style={{fontWeight:"bold"}}>{profileData?.location}</span></div>
            {/* <div>People Manager</div> */}
          </div>
          <div className="mr-10rem">
            <div style={{marginTop:"3rem"}}>Status - <span style={{fontWeight:"bold"}}>{profileData?.member_status}</span></div>
            {/* <div>Primary Skills - DevOps</div> */}
            {!isMyProfile && (
              <div style={{marginTop:"3rem"}}>
                <Button
                style={{marginRight:"1rem"}}
                  label="Give Thank you"
                  size="small"
                  onClick={() => {
                    setVisibleAssistModal(true);
                  }}
                />

                <Button
                  label="Request Assist"
                  size="small"
                  onClick={() => {
                    setVisibleRequestAssistModal(true);
                  }}
                />
              </div>
            )}

            <Dialog
              header="Give Thank you"
              visible={visibleAssistModal}
              style={{ width: "50vw" }}
              onHide={() => {
                if (!visibleAssistModal) return;
                setVisibleAssistModal(false);
              }}
            >
              <GiveAssistModal setVisibleAssistModal={setVisibleAssistModal} toast={toast}/>
            </Dialog>

            <Dialog
              header="Request Assist"
              visible={visibleRequestAssistModal}
              style={{ width: "50vw" }}
              onHide={() => {
                if (!visibleRequestAssistModal) return;
                setVisibleRequestAssistModal(false);
              }}
            >
              <RequestAssistModal setVisibleAssistModal={setVisibleRequestAssistModal}toast={toast}/>
            </Dialog>
          </div>
          <div
            className="mr-10rem"
            style={{ position: "absolute", right: 0, marginTop: "1rem" }}
          >
            <div>
              {/* <button
                onClick={() => {
                  setVisibleProfileModal(true);
                }}
              >
                Edit
              </button> */}

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
