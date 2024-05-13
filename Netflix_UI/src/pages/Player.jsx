import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import YouTube from "react-youtube";
import { fetchMovieTrailer } from "../store";

export default function Player() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const [trailerId, setTrailerId] = useState(null);
  const trailerNotFound = trailerId === null;

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieTrailer(movieId))
        .then((id) => setTrailerId(id))
        .catch(() => setTrailerId(null));
    }
  }, [dispatch, movieId]);

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        {trailerNotFound ? (
          <div className="no-trailer">Trailer not available</div>
        ) : (
          trailerId && <YouTube videoId={trailerId} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    .no-trailer {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      color: #fff;
    }
  }
`;

/*export default function Player() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const [trailerId, setTrailerId] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const trailer = useSelector((state) =>
    state.netflix.movies.find((movie) => movie.id === parseInt(movieId))
  );

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieTrailer(movieId))
        .then((trailerId) => {
          setTrailerId(trailerId);
        })
        .catch((error) => {
          console.error("Error fetching trailer:", error);
        });
    }
  }, [dispatch, movieId]);

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        {trailerId && (
          <iframe
            title="movie-trailer"
            src={`https://www.youtube.com/embed/${trailerId}`}
            allowFullScreen
          ></iframe>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
  }
`;*/
