import './Header.scss';
import {useLocation,useNavigate} from 'react-router-dom';
import panorama_logo from './../../assets/panorama_logo.png'
const Header = (props) =>{
    const location = useLocation();
    const navigation = useNavigate();
    return<>
    <div className="flex-container">
    <div className={`logo_box`} onClick={()=>{
        navigation('/')
    }}>
        <img src={panorama_logo}></img>
    </div>
    <div onClick={()=>{
        navigation('/my-profile')
    }} className={`box ${(location.pathname === '/my-profile') ? 'active' : ''}`} >My Profile</div>
    <div className={`box ${(location.pathname === '/admin') ? 'active' : ''}`}  onClick={()=>{
        navigation('/admin')
    }}>Admin</div>
    <div className="box"></div>

    <div className="box last">Logout</div>
</div>
<div style={{display:"flex",marginBottom:"15px"}}>
    {props.breadCrumbContent}
</div>
    </>
}

export default Header;