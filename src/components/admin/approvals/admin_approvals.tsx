import { Dialog } from "primereact/dialog";
import { useState } from "react";
import AdminApprovalLogsModal from "./admin_approvals_logs_modal";

const AdminApprovals = () =>{
    const [visibleViewApprovalLogsModal,setVisibleViewApprovalLogssetModal] = useState(false);
    return <>
        <div>
            <div>
                <button onClick={() => {
                  setVisibleViewApprovalLogssetModal(true);
                }}>View Past Approvals/Logs</button>
            </div>
            <div>
            <table border={1}>
          <thead>
            <td>Sr.no</td>
            <td>Assisted</td>
            <td>Assist Topic</td>
            <td>Date</td>
            <td>Status</td>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Helped in GIT</td>
              <td>12 Apr 2024</td>
              <td>Approved</td>
            </tr>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Helped in GIT</td>
              <td>12 Apr 2024</td>
              <td>Approved</td>
            </tr>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Helped in GIT</td>
              <td>12 Apr 2024</td>
              <td>Approved</td>
            </tr>
          </tbody>
        </table>
            </div>

        </div>


        <Dialog
              header="Approval Logs"
              visible={visibleViewApprovalLogsModal}
              style={{ width: "50vw" }}
              onHide={() => {
                if (!visibleViewApprovalLogsModal) return;
                setVisibleViewApprovalLogssetModal(false);
              }}
            >
              <AdminApprovalLogsModal />
            </Dialog>
    </>
}

export default AdminApprovals;