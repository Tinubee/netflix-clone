const API_KEY = "78975d1251ca1b10b35c28cc150a9be9";
const BASE_URL = "https://api.themoviedb.org/3";
export interface IGetTvShowDetail {
  backdrop_path: string;
  poster_path: string;
  name: string;
  original_name: string;
  overview: string;
  vote_average: number;
  id: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  last_episode_to_air: {
    air_date: string;
    name: string;
    episode_number: number;
  };
  next_episode_to_air: {
    air_date: string;
    name: string;
    episode_number: number;
  };
}
export interface ITvShow {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  poster_path: string;
}

export interface IGetTvShowsResult {
  page: number;
  results: ITvShow[];
  total_pages: number;
  total_results: number;
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetMovieDetail {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  vote_average: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  tagline: string;
}
export interface IMovie {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
}

export function getNowPlayingMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getPopularMovies() {
  return fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
export function getTopRatedMovies() {
  return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getUpComingMovies() {
  return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export async function getMovieDetail(id: string) {
  return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getPopularTvShows() {
  return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getOnAirTvShows() {
  return fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getTopRatedTvShows() {
  return fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export async function getTvShowDetail(id: string) {
  return fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export async function getSearchMovie(keyword: string) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${keyword}`
  ).then((res) => res.json());
}

export async function getSearchTvShows(keyword: string) {
  return fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${keyword}`
  ).then((res) => res.json());
}
