
import { useState , useContext} from 'react';
import "./navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from "react-router-dom";
import { AuthContext } from '../../authContext/AuthContext';
import {logout} from "../../authContext/AuthActions";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()


    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
      };
    const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
    }
    const handleClick = () => {
      navigate("/account");
    }



    return (
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
          <div className="left">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
            <Link to="/" className="link">
              <span>Homepage</span>
            </Link>
            <Link to="/series" className="link">
              <span className="navbarmainLinks">Series</span>
            </Link>
            <Link to="/movies" className="link">
              <span className="navbarmainLinks">Movies</span>
            </Link>
            <span>New and Popular</span>
            <Link to="/my-list" className="link">
            <span>My List</span>
            </Link>
          </div>
          <div className="right">
            <SearchIcon className="icon" />
            <span>KID</span>
            <NotificationsNoneIcon className="icon" />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt=""
              onClick={handleClick}
            />
            <div className="profile">
              <ArrowDropDownIcon className="icon" />
              <div className="options">
                <span>Settings</span>
                <span onClick = {handleLogout}>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
  
  export default Navbar;