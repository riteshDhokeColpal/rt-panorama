import Header from "../common/Header";
import PastProject from "./past_project";
import ProfileCardSection from "./profile_card_section";
import ProfileHeader from "./profile_header";
import { TabView, TabPanel } from 'primereact/tabview';
const Profile = () =>{
    return <>
    <Header />
    <ProfileHeader />

    <div className="card">
            <TabView>
                <TabPanel header="Profile">
                <ProfileCardSection />

                </TabPanel>
                <TabPanel header="Past Project">
                    <PastProject />
                </TabPanel>
               
            </TabView>
        </div>

    </>
}

export default Profile;