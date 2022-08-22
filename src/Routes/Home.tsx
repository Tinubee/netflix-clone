import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
  IGetMoviesResult,
} from "../api";
import MovieSlider from "../Components/MovieSlider";
import { makeImagePath } from "../utils";

export const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 600;
`;

export const Overview = styled.p`
  font-size: 25px;
  width: 50%;
`;

function Home() {
  const { data: nowPlayingData, isLoading: nowPlayingIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getNowPlayingMovies);

  const { data: popularData, isLoading: popularIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "popular"], getPopularMovies);

  const { data: topRatedData, isLoading: topRatedIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRatedMovies);

  const { data: upComingData, isLoading: upComingIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "upComing"], getUpComingMovies);

  return (
    <Wrapper>
      {nowPlayingIsLoading ||
      popularIsLoading ||
      topRatedIsLoading ||
      upComingIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingData?.results[0].original_title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>
          <MovieSlider data={nowPlayingData} type="Now Playing" />
          <MovieSlider data={popularData} type="Popular" />
          <MovieSlider data={topRatedData} type="Top Rated" />
          <MovieSlider data={upComingData} type="Up Coming" />
        </>
      )}
    </Wrapper>
  );
}
export default Home;
