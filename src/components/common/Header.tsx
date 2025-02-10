import './Header.scss';
import {useLocation,useNavigate} from 'react-router-dom';

const Header = () =>{
    const location = useLocation();
    const navigation = useNavigate();
    console.log(location.pathname);
    return<>
    <div className="flex-container">
    <div className={`box ${(location.pathname === '' || location.pathname === '/') ? 'active' : ''}`} onClick={()=>{
        navigation('/')
    }}>Logo</div>
    <div className={`box ${(location.pathname === '/my-profile') ? 'active' : ''}`} >My Profile</div>
    <div className={`box ${(location.pathname === '/admin') ? 'active' : ''}`}  onClick={()=>{
        navigation('/admin')
    }}>Admin</div>
    <div className="box"></div>

    <div className="box last">Logout</div>
</div>
    </>
}

export default Header;