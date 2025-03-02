import { convertUnixToMonthFullYear, convertUnixToYearMonth } from "../../utils/helpers";

const ProjectHeader = (props) => {
  return (
    <>
      <div
        style={{
          border: "1px solid red",
          textAlign: "start",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          borderRadius: "10px"
        }}
      >
        <div
          style={{
            flex: "1 1 auto",
            minWidth: "300px",
            paddingRight: "15px",
            maxWidth: "56rem",
            textAlign:'justify'
          }}
        >
          <b>Project Name:{" "}</b>
          <span>{props.projectData.name}</span>
          <br />
          <br />
          <b>Project Description:</b> <span style={{justifyContent:"flex-end"}}>{props.projectData.project_desc}</span>
          <br />
          <br />

          <b>Git Repo:</b>{" "}
          <span>
            <a href={props.projectData.github_repo_url}>{props.projectData.name}</a>
          </span>
          <br />
          <br />

        </div>
        <div style={{ flex: "0 1 auto", minWidth: "200px", textAlign: "left" }}>
          <b>Project Start Date:{" "}</b>
          <span>
            {convertUnixToMonthFullYear(props.projectData.start_date)}
          </span>
          <br />
          <b>Project End Date:{" "}</b>
          <span>
            {convertUnixToMonthFullYear(props.projectData.end_date)}
          </span>
          <br />
        </div>
        
      </div>
    </>
  );
};

export default ProjectHeader;
