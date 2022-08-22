import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { getTvShowDetail, IGetTvShowDetail } from "../api";
import { makeImagePath } from "../utils";
import {
  BigMovie,
  BigOverview,
  BigTitle,
  MovieInfoImage,
  Overlay,
} from "./MovieDetail";

interface IProps {
  type: string;
  id: string;
}

function TvDetail({ type, id }: IProps) {
  const { data: detailData, isLoading: detailLoading } =
    useQuery<IGetTvShowDetail>(["tvshow", `${type}Detail`], () =>
      getTvShowDetail(id)
    );
  const { scrollY } = useViewportScroll();

  const history = useHistory();
  const onOverlayClick = () => {
    history.push("/tv");
  };

  return (
    <AnimatePresence>
      {detailLoading ? (
        "Loading..."
      ) : (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <BigMovie style={{ top: scrollY.get() + 100 }}>
            <>
              <MovieInfoImage
                bgPhoto={makeImagePath(
                  detailData?.backdrop_path ? detailData?.backdrop_path : "",
                  "w500"
                )}
              />
              <BigTitle>{detailData?.original_name}</BigTitle>
              <BigOverview>{detailData?.overview}</BigOverview>
            </>
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
}

export default TvDetail;
