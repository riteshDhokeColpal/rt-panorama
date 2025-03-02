import './badge.scss'
import { Tooltip } from 'primereact/tooltip';
const BadgeCard = () => {
    return (
      <>
        <div className="box-card" >

          <div className='badge-tooltip'>
          {/* <div className="badge-circle"> */}
          <Tooltip target=".badge-tooltip" mouseTrack mouseTrackLeft={10} />

          <b>Badge</b><i className="pi pi-sparkles badge-tooltip" style={{color:"#d3020e",marginLeft:"5px"}} data-pr-tooltip="1 Assist + 1 Presentation + 1 Webinar/Training = 1 Badge"></i>
          </div>
          <div>Total 3 Badge</div>
          <div>2 New Badge this year</div>

        </div>
      </>
    );
  };
  
  export default BadgeCard;
  