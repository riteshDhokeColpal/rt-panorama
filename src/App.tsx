import "./App.css";
import SearchPage from "./components/search/serach_index";
import Profile from "./components/profile/profile_index";
import { fetchMemberByUuid } from './service/members/members';
import { useTranslation } from "react-i18next";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeflex/primeflex.css';
import Project from "./components/project/project_index";
import AdminPage from "./components/admin/admin_index";
import 'primeicons/primeicons.css';
import { useEffect } from "react";
import { useAtom } from "jotai";
import { MyprofileDataAtom } from "./atoms/my_profile";
import MemberSkills from "./components/skills/member_skills";
function App() {
  const { t, i18n } = useTranslation();
  const [profileData, setProfileData] = useAtom(MyprofileDataAtom);

  const uuid = 'H7G6F5E4D3C2B1A';
  useEffect(() => {
    async function fetchProfile() {
        try {
            let data;
            if (uuid) {
                // Fetch data by UUID if it's available
                data = await fetchMemberByUuid(uuid);
            } else {
                // Fetch the user's own profile, assume a function exists
                // data = await fetchOwnProfile();
            }
            setProfileData(data);
        } catch (error) {
            console.error('Failed to fetch profile data:', error);
        }
    }
    if(!profileData){
    fetchProfile();
    }
}, [uuid,setProfileData]);
  
  return (
    <>
      
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<SearchPage />} />

            {/* <Route path="explore" element={<ExploreView />} />
            <Route path="explore/my-projects" element={<ExploreView />} />
            */}
            <Route path="profile/:uuid" element={<Profile />} /> 
            <Route path="project/:uuid" element={<Project />} /> 
            <Route path="admin" element={<AdminPage />} /> 
            <Route path="my-profile" element={<Profile />} /> 
            <Route path="member-by-skills/:uuid" element={<MemberSkills />} /> 

            

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
    </Router>
    </>
  );
}

export default App;
