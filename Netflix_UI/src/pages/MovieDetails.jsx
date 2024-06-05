import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "../components/Navbar";
import playButton from "../assets/playButton.png";
import star from "../assets/star1.png";

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
  }
`;

// MovieDetails component
const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState(null);
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const { movieId } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const trailerRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=8524fb05b36b6ae94d93ea2b3c6c5598&append_to_response=credits`
        );
        const data = await response.json();
        setMovie(data);

        const cachedTrailerId = localStorage.getItem(`trailer-${movieId}`);
        if (cachedTrailerId) {
          setTrailerId(cachedTrailerId);
          return;
        }

        const query = `${data.title} official trailer`;
        const youtubeResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
            query
          )}&key=AIzaSyC-8bbl2tPuaWWX4t2-n8BrvD3y6tf164U`
        );
        const youtubeData = await youtubeResponse.json();
        if (youtubeData.items.length > 0) {
          setTrailerId(youtubeData.items[0].id.videoId);
          localStorage.setItem(
            `trailer-${movieId}`,
            youtubeData.items[0].id.videoId
          );
        }
      } catch (error) {
        console.error("Error fetching movie details or trailer:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Handle scroll event
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // Scroll to trailer when play button is clicked
  const handlePlayButtonClick = () => {
    setIsTrailerVisible(true);
    setTimeout(() => {
      if (trailerRef.current) {
        trailerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay to ensure trailer is visible
  };

  if (!movie) return <Loading>Loading...</Loading>;

  return (
    <>
      <GlobalStyle />
      <Container
        backdrop={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      >
        <Navbar isScrolled={isScrolled} />
        <Overlay />
        <Details>
          <Poster>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            {trailerId && !isTrailerVisible && (
              <PlayButton onClick={handlePlayButtonClick}>
                <img src={playButton} alt="Play" />
                Play
              </PlayButton>
            )}
          </Poster>
          <Info>
            <h1>{movie.title}</h1>
            <Overview>{movie.overview}</Overview>
            <AdditionalInfo>
              <p>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <Rating>
                <strong>Rating:</strong> {movie.vote_average}
                <Star src={star} alt="star" />
              </Rating>
              <p>
                <strong>Runtime:</strong> {movie.runtime} minutes
              </p>
              <p>
                <strong>Country:</strong>
                {movie.production_countries.map((country) => (
                  <Country key={country.iso_3166_1}>
                    <Flag
                      src={`https://flagcdn.com/${country.iso_3166_1.toLowerCase()}.svg`}
                      alt={country.name}
                    />
                  </Country>
                ))}
              </p>
              <p>
                <strong>Genres:</strong>{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <Actors>
                <strong>Actors:</strong>
                <ActorList>
                  {movie.credits.cast.slice(0, 5).map((actor) => (
                    <Actor key={actor.id}>
                      <ActorImage
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/200x300?text=No+Image";
                        }}
                      />
                      <ActorName>{actor.name}</ActorName>
                    </Actor>
                  ))}
                </ActorList>
              </Actors>
            </AdditionalInfo>
            {isTrailerVisible && (
              <Trailer
                ref={trailerRef}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailerId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </Info>
        </Details>
      </Container>
    </>
  );
};

// Styled components
const Loading = styled.div`
  color: white;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  background-image: url(${(props) => props.backdrop});
  background-size: cover;
  background-position: center;
  color: white;
  position: relative;
  min-height: 100vh;
  padding-top: 60px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

const Details = styled.div`
  display: flex;
  padding: 2rem;
  position: relative;
  z-index: 2;
  margin-top: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Star = styled.img`
  width: 19px;
  height: 20px;
  margin-left: 0.5rem;
`;

const Poster = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Info = styled.div`
  flex: 2;
  padding-left: 2rem;
  h1 {
    margin-bottom: 1rem;
    font-size: 3rem;
  }
`;

const Overview = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1rem;
`;

const AdditionalInfo = styled.div`
  p {
    margin-bottom: 0.5rem;
    line-height: 1.5;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
  }
  strong {
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const Actors = styled.div`
  margin-top: 1rem;
`;

const ActorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Actor = styled.div`
  flex: 0 0 100px;
  text-align: center;
`;

const ActorImage = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.07);
  }
`;

const ActorName = styled.p`
  font-size: 1px;
  line-height: 1.2;
`;

const Trailer = styled.iframe`
  background-color: black;
  margin-top: 2rem;
  margin-right: 50rem;
  margin-left: -15rem;
  border-radius: 0.5rem;
  border: 3px solid white;
  width: 110%;
  max-width: 110%;
  height: auto;
  aspect-ratio: 16 / 9;
`;

const PlayButton = styled.button`
  background-color: white;
  color: black;
  border: none;
  width: 20rem;
  font-weight: bold;
  border-radius: 30px;
  padding: 10px 120px;
  font-size: 1.1rem;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 3rem;
  img {
    margin-right: 0.5rem;
    width: 20px;
  }
`;

const Country = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
`;

const Flag = styled.img`
  width: 28px;
  height: 30px;
  margin-right: 0.5rem;
`;

export default MovieDetails;
