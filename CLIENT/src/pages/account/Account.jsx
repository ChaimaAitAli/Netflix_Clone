import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import GppGoodIcon from '@mui/icons-material/GppGood';
import DevicesIcon from '@mui/icons-material/Devices';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import "./account.css"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import {logout} from "../../authContext/AuthActions";
import { useContext } from 'react';


export default function Account() {
    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
      }

  return (
    <div className="account">

        <div className="bar">
            <div className="bar-left">
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                alt=""
                />
            </div>
            <div className="bar-right">
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt=""
                />
                <div className="profile">
                <ArrowDropDownIcon className="icon" />
                <div className="options"><br />
                    <Link to="/" className='link'><span > <ArrowBackIcon className="icon"/> Back to Netflix</span></Link><br />
                    <Link to="/account" className='link'><span><AccountBoxIcon className="icon"/> Account</span></Link>
                    <span> <HelpCenterIcon className="icon"/> Help Center</span>
                    <span  onClick = {handleLogout} > <LogoutIcon className="icon"/>  Logout</span>
                </div>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="left">
                <div className="list">
                    <Link to="/" className='link'><span > <ArrowBackIcon className="icon"/> Back to Netflix</span></Link><br />
                    <Link to="/account" className='link'><span> <HomeIcon className="icon"/> Overview</span></Link>
                    <span> <CreditCardIcon className="icon"/> Membership</span>
                    <span> <GppGoodIcon className="icon"/>  Security</span>
                    <span> <DevicesIcon className="icon"/>  Devices</span>

                </div>
            </div>
            <div className="right">
                <h1>Account</h1>

                <h3>Membership Details</h3>

                <div className="membershipDetails">
                    <h4>Standard plan</h4>
                    <h5>Next payment: May 4, 2024</h5><br />
                    <h4>Manage membership <ChevronRightIcon className='right-icon'/></h4>
                </div>
                <br />
                <h3> Quick Links </h3>
                <div className="Links">
                    <span> <ManageAccountsIcon className="icon"/> Change plan <ChevronRightIcon className='right-icon'/></span>
                    <span> <CreditCardIcon className="icon"/> Manage payment method <ChevronRightIcon className='right-icon'/></span>
                    <span> <DevicesIcon className="icon"/> Manage access and devices <ChevronRightIcon className='right-icon'/></span>
                    <span> <LockIcon className="icon"/>  Update password <ChevronRightIcon className='right-icon'/></span>
                    <span> <SupervisorAccountIcon className="icon"/>  Adjust parental controls <ChevronRightIcon className='right-icon'/></span>
                    <span> <SettingsIcon className="icon"/>  Edit settings <ChevronRightIcon className='right-icon'/></span>

                </div>


            </div>
        </div>

    </div>
  )
}
