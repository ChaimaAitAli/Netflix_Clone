import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

const initialState = {
  movies: [],
  likedMovies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=8524fb05b36b6ae94d93ea2b3c6c5598"
  );
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "netflix/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=8524fb05b36b6ae94d93ea2b3c6c5598&with_genres=${genre}`,
      genres
    );
  }
);

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchMovieTrailer = createAsyncThunk(
  "netflix/trailer",
  async (movieId) => {
    const apiKey = "AIzaSyDgrdhQZAxM9sdZvKXaI8NBv2eBUpBncxc";

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieId}+trailer&type=video&key=${apiKey}`
      );
      const data = await response.json();
      const videos = data.items;

      const trailers = videos.filter(
        (item) => item.snippet.title.toLowerCase().indexOf("trailer") !== -1
      );

      const trailerId = trailers.length > 0 ? trailers[0].id.videoId : null;
      return trailerId;
    } catch (error) {
      console.error("Error fetching trailer from Youtube API:", error);
      return null; // Indicate no trailer found on error
    }
  }
);

export const getUsersLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`https://netflix-clone-app/api/user/liked/${email}`);
    return movies;
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put("https://netflix-clone-app/api/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.likedMovies = action.payload; // Update likedMovies array with saved movies
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.likedMovies = action.payload; // Update likedMovies array after removing a movie
    });
    builder.addCase(fetchMovieTrailer.fulfilled, (state, action) => {
      const movie = state.movies.find((m) => m.id === action.meta.arg);
      if (movie) {
        movie.trailerId = action.payload;
      }
    });
  },
});


export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
  devTools: false
});

export const { setGenres, setMovies } = NetflixSlice.actions;
