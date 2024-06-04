import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import account from "../assets/accountICON.png";
import { firebaseAuth } from "../utils/firebase-config";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { signOut } from "firebase/auth";
import axios from "axios";
import { IoIosNotifications } from "react-icons/io";

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }
      try {
        const apiKey = "8524fb05b36b6ae94d93ea2b3c6c5598";
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchQuery}`
        );
        setSearchResults(response.data.results.slice(0, 4)); // Limit to first 4 results
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  const openAccountPage = () => {
    navigate("/account");
  };

  const handleResultClick = (id, mediaType) => {
    if (mediaType === "movie") {
      navigate(`/movieDetails/${id}`);
    } else if (mediaType === "tv") {
      navigate(`/TVshowDetails/${id}`);
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleBlur = () => {
    if (!inputHover) {
      setShowSearch(false);
      setSearchResults([]);
    }
  };

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button onFocus={() => setShowSearch(true)} onBlur={handleBlur}>
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={handleBlur}
            />
            {searchResults.length > 0 && (
              <div className="dropdown">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="dropdown-item"
                    onMouseDown={() =>
                      handleResultClick(result.id, result.media_type)
                    }
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                      alt={result.title || result.name}
                    />
                    <div className="info">
                      <span className="title">
                        {result.title || result.name}
                      </span>
                      <span className="year">
                        {new Date(
                          result.release_date || result.first_air_date
                        ).getFullYear()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <IoIosNotifications className="icon" />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt=""
              onClick={openAccountPage}
            />
          <div className="profile">
            <IoMdArrowDropdown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => signOut(firebaseAuth)}>Logout</span>
            </div>
          </div>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
            font-family: "Roboto", sans-serif;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .icon{
        height: 30px;
        width:30px;
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
        .dropdown {
          position: absolute;
          top: 2rem;
          left: 0;
          width: 100%;
          background-color: white;
          border-radius: 0.3rem;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 10;
          .dropdown-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            cursor: pointer;
            border-bottom: 1px solid #ddd;
            &:hover {
              background-color: rgba(0, 0, 0, 0.1);
            }
            img {
              width: 50px;
              height: 75px;
              object-fit: cover;
              border-radius: 0.3rem;
            }
            .info {
              display: flex;
              flex-direction: column;
              .title {
                font-weight: bold;
                color: black;
              }
              .year {
                color: gray;
                font-size: 0.9rem;
              }
            }
          }
          .dropdown-item:last-child {
            border-bottom: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
      img {
        height: 40px;
        width: 40px;
        border-radius: 12px;
        cursor: pointer;
      }
      .profile {
        .options {
          display: none;
          background-color: var(--main-color);
          border-radius: 5px;
        }
        span {
          padding: 10px;
          cursor: pointer;
          color: black;
          font-size: 15px;
        }
        span:hover {
          font-weight: bold;
        }
        &:hover {
          .options {
            display: flex;
            flex-direction: column;
            position: absolute;
            background-color: #d0d0d0;
          }
        }
      }
    }
  }
`;
