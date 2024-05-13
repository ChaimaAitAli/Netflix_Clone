import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked, fetchMovieTrailer } from "../store";
import YouTube from "react-youtube";

export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [trailerId, setTrailerId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [isPlaying, setIsPlaying] = useState(false);

  /*useEffect(() => {
    if (movieData.id) {
      const apiKey = "AIzaSyDgrdhQZAxM9sdZvKXaI8NBv2eBUpBncxc"; //AIzaSyC-8bbl2tPuaWWX4t2-n8BrvD3y6tf164U
      YouTubeSearch(
        { key: apiKey, term: `${movieData.name} trailer` },
        (videos) => {
          if (videos) {
            const trailer = videos.find(
              (video) =>
                video.snippet.title.toLowerCase().indexOf("trailer") !== -1
            );
            setTrailerId(trailer ? trailer.id.videoId : null);
          } else {
            console.error("Error fetching trailer from Youtube API");
            setTrailerId(null);
          }
        }
      );
    }
  }, [dispatch, movieData.id]);*/

  useEffect(() => {
    const fetchTrailer = async () => {
      setIsLoading(true);
      const apiKey = "AIzaSyDgrdhQZAxM9sdZvKXaI8NBv2eBUpBncxc"; // Replace with your Youtube Data API key

      // Check if trailerId is already cached in localStorage (optional)
      const cachedTrailerId = localStorage.getItem(`trailer-${movieData.id}`);
      if (cachedTrailerId) {
        setTrailerId(cachedTrailerId);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}&q=${movieData.name}+trailer&type=video`
        );
        const data = await response.json();
        const trailers = data.items.filter(
          (item) => item.snippet.title.toLowerCase().indexOf("trailer") !== -1
        );

        const trailerId = trailers.length > 0 ? trailers[0].id.videoId : null;
        setTrailerId(trailerId);

        // Optionally cache the trailerId in localStorage for future use
        localStorage.setItem(`trailer-${movieData.id}`, trailerId);
      } catch (error) {
        console.error("Error fetching trailer from Youtube API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!trailerId) {
      fetchTrailer();
    }
  }, [dispatch, movieData.id, trailerId]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={movieData.id}>
      <Container
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt="card"
          onClick={() => navigate("/player")}
        />

        {isHovered && (
          <div className="hover">
            <div className="image-video-container">
              {isLoading ? (
                <p>Loading trailer...</p>
              ) : (
                trailerId && (
                  <YouTube
                    videoId={trailerId}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: { autoplay: 1, mute: 1, controls: 1 },
                    }}
                  />
                )
              )}
            </div>
            <div className="info-container flex column">
              <h3 className="name" onClick={() => navigate("/player")}>
                {movieData.name}
              </h3>
              <div className="icons flex j-between">
                <div className="controls flex">
                  <IoPlayCircleSharp
                    title="Play"
                    onClick={() => navigate("/player")}
                  />
                  <RiThumbUpFill title="Like" />
                  <RiThumbDownFill title="Dislike" />
                  {isLiked ? (
                    <BsCheck
                      title="Remove from List"
                      onClick={() =>
                        dispatch(
                          removeMovieFromLiked({
                            movieId: movieData.id,
                            email,
                          })
                        )
                      }
                    />
                  ) : (
                    <AiOutlinePlus title="Add to my list" onClick={addToList} />
                  )}
                </div>
                <div className="info">
                  <BiChevronDown title="More Info" />
                </div>
              </div>
              <div className="genres flex">
                <ul className="flex">
                  {movieData.genres.map((genre) => (
                    <li>{genre}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
