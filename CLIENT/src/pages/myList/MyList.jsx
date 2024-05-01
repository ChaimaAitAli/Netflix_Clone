import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DoneIcon from '@mui/icons-material/Done';
import Navbar from '../../components/navbar/Navbar';
import './myList.css';
import "../../components/listItem/listItem.css"

export default function MyList() {
  const [savedItems, setSavedItems] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get(`/movies/user/${user._id}`, {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        });
        setSavedItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedItems();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await Promise.all(savedItems.map(async (itemId) => {
          const res = await axios.get(`/movies/find/${itemId}`, {
            headers: {
              token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
            },
          });
          return res.data;
        }));
        setMovies(moviesData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();
  }, [savedItems]);

  return (
    <div className="myList">
      <Navbar />
      <div className="container1">
        <h1>My List</h1>
        <div className="listItem">
          {movies.map((movie, index) => (
            <div
              className="movieItem"
              key={movie._id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={movie.img} alt={movie.title} />
              {hoveredIndex === index && (
                <div className="itemInfo">
                  <div className="icons">
                    <Link to={{ pathname: "/watch", movie: movie }} className="link">
                      <PlayArrowIcon className="icon" />
                    </Link>
                    <DoneIcon className="icon" />
                    <ThumbUpIcon className="icon" />
                    <ThumbDownIcon className="icon" />
                  </div>
                  <div className="itemInfoTop">
                    <span className="limit">+{movie.limit}</span>
                    <span>{movie.year}</span>
                  </div>
                  <div className="desc">{movie.desc}</div>
                  <div className="genre">{movie.genre}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
