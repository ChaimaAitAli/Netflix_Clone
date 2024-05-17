import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";

import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate, Link } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { MdDevices } from "react-icons/md";
import { MdCardMembership } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdDeviceUnknown } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";



export default function Account() {


  const navigate = useNavigate();
  const dispatch = useDispatch();



 /* onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });*/


  return (
    <Container>
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
        <IoMdArrowDropdown className="icon" />
        <div className="options"><br />
            <Link to="/" className='link'><span > <IoMdArrowBack className="icon"/> Back to Netflix</span></Link><br />
            <Link to="/account" className='link'><span><MdAccountCircle className="icon"/> Account</span></Link>
            <span> <MdHelpOutline className="icon"/> Help Center</span>
            <span onClick={() => signOut(firebaseAuth)} > <BiLogOutCircle className="icon"/>  Logout</span>
        </div>
        </div>
    </div>
</div>

<div className="container">
    <div className="left">
        <div className="list">
            <Link to="/" className='link'><span > <IoMdArrowBack className="icon"/> Back to Netflix</span></Link><br />
            <Link to="/account" className='link'><span> <FaHome className="icon"/> Overview</span></Link>
            <span> <FaRegCreditCard className="icon"/> Membership</span>
            <span> <MdOutlineSecurity className="icon"/>  Security</span>
            <span> <MdDevices className="icon"/>  Devices</span>

        </div>
    </div>
    <div className="right">
        <h1>Account</h1>

        <h3>Membership Details</h3>

        <div className="membershipDetails">
            <h4>Standard plan</h4>
            <h5>Next payment: May 4, 2024</h5><br />
            <h4>Manage membership <MdCardMembership className='right-icon'/></h4>
        </div>
        <br />
        <h3> Quick Links </h3>
        <div className="Links">
            <span> <MdManageAccounts className="icon"/> Change plan <FaChevronRight className='right-icon'/></span>
            <span> <FaRegCreditCard className="icon"/> Manage payment method <FaChevronRight className='right-icon'/></span>
            <span> <MdDeviceUnknown className="icon"/> Manage access and devices <FaChevronRight className='right-icon'/></span>
            <span> <FaLock className="icon"/>  Update password <FaChevronRight className='right-icon'/></span>
            <span> <MdSupervisorAccount className="icon"/>  Adjust parental controls <FaChevronRight className='right-icon'/></span>
            <span> <IoSettingsOutline className="icon"/>  Edit settings <FaChevronRight className='right-icon'/></span>

        </div>


    </div>
</div>

</div>
      
    </Container>
  );
}
const Container = styled.div`
.account{
    color:black;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;



  .bar {
    background-color: rgb(250, 250, 250);
    padding: 0px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;

    .bar-left {
      display: flex;
      align-items: center;

      img {
        margin-left: 20px;
        height: 35px;

      }

      span {
        margin-right: 20px;
        cursor: pointer;

        @media (max-width: 480px) {
          display: none;
        }

        &.navbarmainLinks {
          @media (max-width: 480px) {
            display: block;
          }
        }
      }
    }

    .bar-right {
        display: flex;
        align-items: center;
        margin-right: 80px;


      .icon {
        cursor: pointer;
        margin:12px;
        height: 25px;
        width :25px;
      }

      img {
        
        width: 40px;
        height: 40px;
        border-radius: 5px;
        object-fit: cover;
        cursor: pointer;
        
      }

      .profile {
        .options {
            height:230px;
            width:220px;
            padding-right:5px ;
            background-color: rgb(245, 248, 248);
            display: none;
            border-radius: 12px;
            font-weight: 300;
            z-index: 900;
            position: relative;
            right:70px;

          .link{
            text-decoration: none;
            color:black;
          }

          .icon{
            width: 20px;
            height: 20px;

  
          }
        }

        span {
            display: flex;
            align-items: center;

            height: 30px;
            width: 200px;
            padding: 10px;
            margin: 10px;
            cursor: pointer;
            position:relative;
            top:-20px;
            color:back;

        }

        &:hover {
          .options {
            display: flex;
            flex-direction: column;
            position: absolute;
            border-radius: 12px;

          }
          span:hover {
            background-color: rgb(239, 240, 241);
            font-weight: 400;
            border-radius: 12px;

          }

        }
      }
    }
  }

  .container {
    background-color:white;
    display: flex;
    position: relative;
    top:50px;
  }
  
  .left {
    position: relative;
    left: 1%;
    background-color: rgb(255, 255, 255);
    width: 30%;
    padding: 4%;

    
    .list{
        display: flex;
        flex-direction: column;
        font-size: 20px;

        .link{
            text-decoration: none;
            color:black;
        }

        .icon{
            margin:15px;
            height :30px;
            width:30px;
            color:black;
      

        }
        span{
            padding: 2%;
            font-weight: 300;
            display: flex;
            align-items: center;

            
        }

        span:hover{
            font-weight: 400;
            cursor: pointer;
        }
        
    }
  }
  
  .right {
    position: relative;
    right: 10%;
    background-color:rgb(255, 255, 255);
    width: 70%;
    padding: 4%;



    h1{
      padding:  5px 5px  5px 0 ;
      font-size: 50px;

    }
    h3{ 
        font-weight: 400;
        font-size: 20px;
        margin:  15px 5px  20px 0 ;
        }
 


    .membershipDetails {
        border: 1px solid #ccc; /* Add border around the container */
        border-radius: 15px;
        margin: 10px 15px 15px 0 ; /* Add padding for spacing */
        padding : 10px;
        
      }
      
      .membershipDetails h4 {
        display: flex;
        padding: 2px 2px 5px 2px ;
        justify-content: space-between;
        padding-top: 2px;
        font-weight: 450;
        font-size: 23px;
        padding: 3px 10px 10px 20px ;

      }
      
      .membershipDetails h5 {
        border-bottom: 1px solid #ccc; /* Add border-bottom to separate next payment and manage membership */
        font-weight: 300;
        font-size: 20px;
        padding: 10px 10px 25px 25px ;

      }
      
      .icon {
        margin-left: 5px; /* Add spacing between text and icon */
      }
      
    .Links {
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc; 
        border-radius: 20px;
        padding: 10px; 
        margin : 10px 15px 15px 0 ;
      }

      
      
      .Links span {
        display: flex;
        align-items: center;
        padding : 20px;
        font-weight: 300;
        justify-content: space-between;

      }
      
      .Links span:not(:last-child) {
        border-bottom: 1px solid #ccc;
      }
      .Links span:hover{
        font-weight: 400;
      }
      
      .icon {
        margin-right: 15px;
        height:25px;
        width:25px;

      }
      .right-icon{
        align-self: flex-end;
        }
  }

  @media (max-width: 950px) {
    .container {
      flex-direction: column;
    }
  
    .left {
      display: none;
    }
  
    .right {
      width: 60%; /* Take full width when left container disappears */
      margin: 0 auto; /* Center the right container */
    }
  }
  
}`;