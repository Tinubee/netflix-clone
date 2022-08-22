import { useQuery } from "react-query";
import {
  getOnAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  IGetTvShowsResult,
} from "../api";
import TvSlider from "../Components/TvSlider";
import { makeImagePath } from "../utils";
import { Banner, Loader, Overview, Title, Wrapper } from "./Home";

function Tv() {
  const { data: onAirData, isLoading: onAirIsLoading } =
    useQuery<IGetTvShowsResult>(["tvshows", "onAir"], getOnAirTvShows);

  const { data: popularData, isLoading: popularIsLoading } =
    useQuery<IGetTvShowsResult>(["tvshows", "popular"], getPopularTvShows);

  const { data: topRatedData, isLoading: topRatedIsLoading } =
    useQuery<IGetTvShowsResult>(["tvshows", "topRated"], getTopRatedTvShows);

  return (
    <Wrapper>
      {onAirIsLoading || popularIsLoading || topRatedIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              topRatedData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{topRatedData?.results[0].original_name}</Title>
            <Overview>{topRatedData?.results[0].overview}</Overview>
          </Banner>
          <TvSlider data={onAirData} type="On Air" />
          <TvSlider data={popularData} type="Popular" />
          <TvSlider data={topRatedData} type="Top Rated" />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
