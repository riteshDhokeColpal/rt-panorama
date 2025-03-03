import Header from "../common/Header";
import { TabView, TabPanel } from 'primereact/tabview';
import AdminMembers from "./members/admin_members";
import AdminProjects from "./projects/admin_projects";
import AdminSkillset from "./skillset/admin_skills";
const AdminPage = () =>{
    return <>
    <Header />
    <h3>Admin View</h3>
    <p>Admin can grant only view or grant admin to any user, can manage all project operations</p>
    <TabView>
                {/* <TabPanel header="Members">
                    <AdminMembers />
                </TabPanel> */}
                <TabPanel header="Projects">
                    <AdminProjects />
                </TabPanel>
                <TabPanel header="Skillsets">
                    <AdminSkillset />
                </TabPanel>
               
            </TabView>
    </>
}
export default AdminPage;