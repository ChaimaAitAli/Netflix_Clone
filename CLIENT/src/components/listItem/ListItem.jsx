import "./listItem.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [isSaved, setIsSaved] = useState(false); 

  useEffect(() => {
    
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setMovie(res.data);


        const savedItemsRes = await axios.get("/movies/check", {
          params: {
            userId: JSON.parse(localStorage.getItem("user"))._id,
            movieId: res.data._id,
          },
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setIsSaved(savedItemsRes.data.exists);

      } catch (err) {
        console.log(err);
      }
    };
    
    getMovie();
  }, [item]);

  const addItem = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("/movies/add", {
        userId: user._id,
        movieId: movie._id
      }, {
        headers: {
          token: "Bearer " + user.accessToken
        }
      });
      console.log(res);
      setIsSaved(true); 
    } catch (err) {
      console.log(err);
      console.log("no movie added");
    }
  };

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movie?.img} alt="" />
      {isHovered && (
        <>
          <div className="itemInfo">
            <div className="icons">
             <Link to={{ pathname: "/watch", movie: movie }} className="link">
                <PlayArrowIcon className="icon" />
              </Link>
              {isSaved ? (
                <DoneIcon className="icon" />
              ) : (
                <AddIcon className="icon" onClick={addItem} />
              )}
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
        </>
      )}
    </div>
  );
}
