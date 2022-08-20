const API_KEY = "78975d1251ca1b10b35c28cc150a9be9";
const BASE_URL = "https://api.themoviedb.org/3";

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

export interface IMovie {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
}

export function getMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
