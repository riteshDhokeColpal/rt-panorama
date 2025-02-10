import "./App.css";
import SearchPage from "./components/search/serach_index";
import Profile from "./components/profile/profile_index";
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
function App() {
  const { t, i18n } = useTranslation();
  
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
    </Router>
    </>
  );
}

export default App;
