import ProjectTree from "./project_tree";

const ProjectSection = (props) =>{
    return <>
        <ProjectTree ProjectMembers={props.ProjectMembers}/>
    </>
}
export default ProjectSection;