import AssistCard from "./cards/assists";
import BadgeCard from "./cards/badge";
import GithubCard from "./cards/github";
import OrgTime from "./cards/org_time";
import PresentationCard from "./cards/presentations";
import ProjectInfoCard from "./cards/projects_info_card";
import SkillCard from "./cards/skills";
import TrainingsCard from "./cards/trainings";
import './profile.scss'
const ProfileCardSection = () =>{
    return <>
        <div className="flex-container-card-section">
            <SkillCard />
            <OrgTime />
            <BadgeCard />
        </div>
        <div className="flex-container-card-section">
            <AssistCard />
            <PresentationCard />
            <TrainingsCard />
        </div>
        <div className="flex-container-card-section">
            <GithubCard />
            <div className="box-card" style={{background:"none"}}>
            <ProjectInfoCard />
            </div>
            <div className="box-card" style={{background:"none"}}>

            </div>
        </div>
    </>
}

export default ProfileCardSection;