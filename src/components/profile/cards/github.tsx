import { Button } from "primereact/button";

const GithubCard = () => {
    return (
      <>
        <div className="box-card">
            <div>
              <i className="pi pi-github"></i>
            </div>
          <div> Github Activity</div>
          <div>
            <i className="pi pi-external-link" style={{color:"#d3020e"}}></i>
          </div>
        </div>
      </>
    );
  };
  
  export default GithubCard;
  