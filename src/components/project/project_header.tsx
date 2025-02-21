import { convertUnixToYearMonth } from "../../utils/helpers";

const ProjectHeader = (props) =>{
    return <>
        <div style={{border:"1px solid red",textAlign: "start",
    padding: "15px"}}>

            Project Name :<span style={{fontWeight:"bold"}}>{props.projectData.name}</span><br/>
            Project Desc :<span style={{fontWeight:"bold"}}>{props.projectData.project_desc}</span><br/>
            Project Start Date :<span style={{fontWeight:"bold"}}>{convertUnixToYearMonth(props.projectData.start_date)}</span><br/>
            Project End Date :<span style={{fontWeight:"bold"}}>{convertUnixToYearMonth(props.projectData.end_date)}</span><br/>
            Git Repo : <span style={{fontWeight:"bold"}}><a href={props.projectData.github_repo_url}>Project url</a></span><br/>
        </div>
    </>
}

export default ProjectHeader;