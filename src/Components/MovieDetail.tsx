import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, IGetMovieDetail } from "../api";
import { makeImagePath } from "../utils";

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const MovieInfoImage = styled.div<{ bgPhoto: string }>`
  border-radius: 12px 12px 0 0;
  height: 300px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

export const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 30px;
  top: -80px;
  font-weight: 600;
`;

export const BigOverview = styled.p`
  padding: 20px;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
interface IProps {
  type: string;
  id: string;
}

function MovieDetail({ type, id }: IProps) {
  const { scrollY } = useViewportScroll();
  const { data: detailData, isLoading: detailLoading } =
    useQuery<IGetMovieDetail>(["movie", `${type}Detail`], () =>
      getMovieDetail(id)
    );
  const history = useHistory();
  const onOverlayClick = () => {
    history.push("/");
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
              <BigTitle>{detailData?.original_title}</BigTitle>
              <BigOverview>{detailData?.overview}</BigOverview>
            </>
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
}

export default MovieDetail;
