import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import ViewAssistModal from "../modals/view_assists";
import RequestAssistModal from "../modals/request_modal";

import { useAtom } from "jotai";
import { IsMyprofileDataAtom } from "../../../atoms/my_profile";
import { fetchAssistByMemberUuid } from "../../../service/assists/assists_service";
import { profileDataAtom } from "../atoms/micro_level_member_atoms";
import { getAssistStats } from "../../../utils/helpers";
import { Toast } from "primereact/toast";

const AssistCard = () => {
  const [profileData] = useAtom(profileDataAtom);
  const [visibleViewAssistModal, setVisibleViewAssistsetModal] =
    useState(false);
  const [isMyProfile] = useAtom(IsMyprofileDataAtom);
  const [assistsData, setAssistsData] = useState([]);
  const [memberUuid] = useState(profileData?.uuid);
  const [assistStats, setAssistsStats] = useState([]);
  const toast = useRef(null);


  useEffect(() => {

    const show = () => {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Your assistance entry has been successfully submitted",
        life: 30000,
      });
    };

    async function getAssists() {
      try {
        const skillsData = await fetchAssistByMemberUuid(profileData?.uuid);

        setAssistsData(skillsData);
        let stats = getAssistStats(skillsData);
        setAssistsStats(stats);
      } catch (err) {
        setAssistsData("Failed to fetch skills");
      }
    }
    if (profileData?.uuid) {
      getAssists();
    }
  }, [memberUuid,profileData]);
  return (
    <>
      <Toast ref={toast} />

      <div className="box-card">
        <div style={{ display: "flex" }}>
          {isMyProfile && (<></>
            // <i className="pi pi-pencil"  onClick={() => {
            //   setVisibleViewAssistsetModal(true);
            // }} style={{ color: 'var(--primary-color)',marginLeft: "auto" }}></i>
          )}

          <Dialog
            header="View Assists"
            visible={visibleViewAssistModal}
            style={{ width: "50vw" }}
            onHide={() => {
              if (!visibleViewAssistModal) return;
              setVisibleViewAssistsetModal(false);
            }}
          >
            <RequestAssistModal />
          </Dialog>
        </div>
        <div><b>Assists</b> <i className="pi pi-star-fill" style={{color:"#d3020e"}}></i></div>

        <div>Total : {assistStats[0]}</div>
        <div>Current Year : {assistStats[1]}</div>
        <div>Current Quarter : {assistStats[2]}</div>
      </div>
    </>
  );
};

export default AssistCard;
