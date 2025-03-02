
import { useParams,useNavigate } from 'react-router-dom';
import { fetchMemberByUuid } from './../../service/members/members';
import { useAtom } from 'jotai';
import { profileDataAtom } from './atoms/micro_level_member_atoms';
import AdminApprovals from "../admin/approvals/admin_approvals";
import Header from "../common/Header";
import PastProject from "./past_project";
import ProfileCardSection from "./profile_card_section";
import ProfileHeader from "./profile_header";
import { TabView, TabPanel } from 'primereact/tabview';
import { useEffect, useState } from 'react';
import { IsMyprofileDataAtom, MyprofileDataAtom } from '../../atoms/my_profile';
const Profile = () =>{
    const navigate = useNavigate();
    const { uuid } = useParams(); // Get the uuid from the route params
    const [profileData, setProfileData] = useAtom(profileDataAtom);
    const [MyprofileData] = useAtom(MyprofileDataAtom);
    const [isMyProfile,setIsMyProfile] = useAtom(IsMyprofileDataAtom);

    useEffect(() => {
        async function fetchProfile() {
            try {
                let data;
                if (uuid) {
                    // Fetch data by UUID if it's available
                    data = await fetchMemberByUuid(uuid);
                    setProfileData(data);

                    setIsMyProfile(false)
                } else {
                    setIsMyProfile(true)
                    setProfileData(MyprofileData);
                   
                    // Fetch the user's own profile, assume a function exists
                    // data = await fetchOwnProfile();
                }
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
                if (!profileData) {
                    navigate('/')// Display a loading indicator while data is being fetched
                }
            }
        }

        fetchProfile();
        
    }, [uuid,setProfileData,MyprofileData]);

   

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
                {/* <TabPanel header="Approvals">
                    <AdminApprovals />
                </TabPanel> */}
               
            </TabView>
        </div>

    </>
}

export default Profile;