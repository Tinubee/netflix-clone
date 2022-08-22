import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearchMovie, getSearchTvShows } from "../api";
import MovieSlider from "../Components/MovieSlider";
import TvSlider from "../Components/TvSlider";
import { Loader, Wrapper } from "./Home";

const Container = styled.div`
  margin-top: 100px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: moviesData, isLoading: moviesLoading } = useQuery(
    ["seacrchMovies", keyword],
    () => getSearchMovie(keyword!),
    {
      enabled: !!keyword,
    }
  );
  const { data: tvShowsData, isLoading: tvShowsLoading } = useQuery(
    ["seacrchTvShows", keyword],
    () => getSearchTvShows(keyword!),
    {
      enabled: !!keyword,
    }
  );

  return (
    <Wrapper>
      {moviesLoading || tvShowsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Container>
          <MovieSlider data={moviesData} type="Movie Search" />
          <TvSlider data={tvShowsData} type="Tv Show Search" />
        </Container>
      )}
    </Wrapper>
  );
}

export default Search;
