import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

export default function Player() {
  const navigate = useNavigate();

  const strangerThingsTrailerId = "m7IGTH_KVQg";
  const [trailerId, setTrailerId] = useState(null);

  useEffect(() => {
    const cachedTrailerId = localStorage.getItem("trailerId");
    if (cachedTrailerId) {
      setTrailerId(cachedTrailerId);
      return;
    }

    setTrailerId(strangerThingsTrailerId);
    localStorage.setItem("trailerId", strangerThingsTrailerId);
  }, []);

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        {trailerId && (
          <YouTube
            videoId={trailerId}
            opts={{
              playerVars: {
                autoplay: 1,
                controls: 1,
              },
            }}
            className="video"
          />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  .player {
    width: 100%;
    height: 100%;
    position: relative;

    .back {
      position: absolute;
      top: 2rem;
      left: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
        color: white;
      }
    }

    .video {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    iframe {
      width: 100%;
      height: 100%;
    }
  }
`;
