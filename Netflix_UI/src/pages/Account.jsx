import React, { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth"; // Imported together
import styled from "styled-components";
import { firebaseAuth } from "../utils/firebase-config";
import account from "../assets/accountICON.png";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowBack } from "react-icons/io";
import {
  MdAccountCircle,
  MdHelpOutline,
  MdOutlineSecurity,
  MdDevices,
  MdCardMembership,
  MdSupervisorAccount,
  MdDeviceUnknown,
  MdManageAccounts,
} from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import {
  FaHome,
  FaChevronRight,
  FaLock,
  FaRegCreditCard,
} from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export default function Account() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <Container>
      <div className="account">
        <div className="bar">
          <div className="bar-left">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="Netflix"
            />
          </div>
          <div className="bar-right">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            />
            <div className="profile">
              <IoMdArrowDropdown className="icon" />
              <div className="options">
                <Link to="/" className="link">
                  <span>
                    <IoMdArrowBack className="icon" /> Back to Netflix
                  </span>
                </Link>
                <Link to="/account" className="link">
                  <span>
                    <MdAccountCircle className="icon" /> Account
                  </span>
                </Link>
                <span>
                  <MdHelpOutline className="icon" /> Help Center
                </span>
                <span onClick={() => signOut(firebaseAuth)}>
                  <BiLogOutCircle className="icon" /> Logout
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="left">
            <div className="list">
              <Link to="/" className="link">
                <span>
                  <IoMdArrowBack className="icon" /> Back to Netflix
                </span>
              </Link>
              <Link to="/account" className="link">
                <span>
                  <FaHome className="icon" /> Overview
                </span>
              </Link>
              <span>
                <FaRegCreditCard className="icon" /> Membership
              </span>
              <span>
                <MdOutlineSecurity className="icon" /> Security
              </span>
              <span>
                <MdDevices className="icon" /> Devices
              </span>
            </div>
          </div>
          <div className="right">
            <h1>Account</h1>

            <h3>Membership Details</h3>
            <div className="membershipDetails">
              <h4>Standard plan</h4>
              <h5>Next payment: May 4, 2024</h5>
              <h4>
                Manage membership <MdCardMembership className="right-icon" />
              </h4>
            </div>

            <h3>Quick Links</h3>
            <div className="links">
              <span>
                <MdManageAccounts className="icon" /> Change plan
                <FaChevronRight className="right-icon" />
              </span>
              <span>
                <FaRegCreditCard className="icon" /> Manage payment method
                <FaChevronRight className="right-icon" />
              </span>
              <span>
                <MdDeviceUnknown className="icon" /> Manage access and devices
                <FaChevronRight className="right-icon" />
              </span>
              <span>
                <FaLock className="icon" /> Update password
                <FaChevronRight className="right-icon" />
              </span>
              <span>
                <MdSupervisorAccount className="icon" /> Adjust parental
                controls
                <FaChevronRight className="right-icon" />
              </span>
              <span>
                <IoSettingsOutline className="icon" /> Edit settings
                <FaChevronRight className="right-icon" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .account {
    color: black;
    font-family: Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu,
      sans-serif;

    .bar {
      background-color: rgb(250, 250, 250);
      padding: 0 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      position: fixed;
      top: 0;
      z-index: 999;
      width: 100%;
      border-bottom: 1px solid #e6e6e6;

      .bar-left {
        display: flex;
        align-items: center;

        img {
          margin-left: 20px;
          height: 35px;
        }
      }

      .bar-right {
        display: flex;
        align-items: center;
        margin-right: 80px;

        .icon {
          cursor: pointer;
          margin: 12px;
          height: 25px;
          width: 25px;
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
            height: 230px;
            width: 220px;
            padding-right: 5px;
            background-color: rgb(245, 248, 248);
            display: none;
            border-radius: 12px;
            font-weight: 300;
            z-index: 900;
            position: absolute;
            right: 0;
            top: 60px;
            padding: 10px;
            height: auto;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

            .link {
              text-decoration: none;
              color: black;
            }

            .icon {
              width: 20px;
              height: 20px;
              color: red; /* Red accent */
            }

            span {
              display: flex;
              align-items: center;
              padding: 10px;
              cursor: pointer;
              transition: background-color 0.2s ease;

              &:hover {
                background-color: rgb(239, 240, 241);
              }
            }
          }

          &:hover {
            .options {
              display: flex;
              flex-direction: column;
            }
          }
        }
      }
    }

    .container {
      background-color: white;
      display: flex;
      position: relative;
      top: 70px;
      padding: 20px;
    }

    .left {
      background-color: white;
      width: 30%;
      padding: 20px;

      .list {
        display: flex;
        flex-direction: column;
        font-size: 18px;

        .link {
          text-decoration: none;
          color: black;
        }

        .icon {
          margin: 15px;
          height: 30px;
          width: 30px;
          color: red; /* Red accent */
        }

        span {
          padding: 15px 0;
          font-weight: 300;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: font-weight 0.2s ease;

          &:hover {
            font-weight: 400;
          }
        }
      }
    }

    .right {
      background-color: white;
      width: 62%;
      padding: 20px;

      h1 {
        font-size: 36px;
        margin-bottom: 20px;
      }

      h3 {
        font-weight: 400;
        font-size: 24px;
        margin: 20px 0;
      }

      .membershipDetails {
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;

        h4 {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          margin-bottom: 10px;
        }

        h5 {
          border-bottom: 1px solid #ccc;
          font-weight: 300;
          font-size: 16px;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }

        .right-icon {
          color: red; /* Red accent */
        }
      }

      .links {
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;

        span {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          font-weight: 300;
          cursor: pointer;
          transition: font-weight 0.2s ease;

          &:not(:last-child) {
            border-bottom: 1px solid #ccc;
          }

          &:hover {
            font-weight: 400;
          }

          .icon {
            margin-right: 10px;
            color: red; /* Red accent */
          }

          .right-icon {
            color: red; /* Red accent */
          }
        }
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
        width: 100%;
        margin: 0 auto;
      }
    }
  }
`;