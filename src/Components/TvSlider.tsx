import {
  faSquareCaretLeft,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { IGetTvShowsResult } from "../api";
import { makeImagePath } from "../utils";
import {
  Box,
  boxVariants,
  IconContainer,
  IconVariants,
  Info,
  infoVariants,
  MovieTitle,
  NextIcon,
  offset,
  PrevIcon,
  Row,
  rowVariants,
  Slider,
  TypeText,
} from "./MovieSlider";
import TvDetail from "./TvDetail";

interface IProps {
  type: string;
  data?: IGetTvShowsResult;
}

function TvSlider({ data, type }: IProps) {
  const history = useHistory();
  const bigTvShowsMatch = useRouteMatch<{ tvshowId: string; type: string }>(
    "/tv/:type/:tvshowId"
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalTvShows = data.results.length - 1;
      const maxIndex = Math.floor(totalTvShows / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const discreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalTvShows = data.results.length - 1;
      const maxIndex = Math.floor(totalTvShows / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex - 1 : prev - 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClick = (tvshowId: number, type: string) => {
    history.push(`/tv/${type}/${tvshowId}`);
  };

  return (
    <>
      <Slider>
        <TypeText>{type}</TypeText>
        <IconContainer>
          <PrevIcon
            variants={IconVariants}
            initial="initial"
            whileHover="hover"
            onClick={discreaseIndex}
          >
            <FontAwesomeIcon icon={faSquareCaretLeft} />
          </PrevIcon>
          <NextIcon
            variants={IconVariants}
            initial="initial"
            whileHover="hover"
            onClick={increaseIndex}
          >
            <FontAwesomeIcon icon={faSquareCaretRight} />
          </NextIcon>
        </IconContainer>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(offset * index, offset * index + offset)
              .map((tvshow: any) => (
                <>
                  <Box
                    key={tvshow.id + type}
                    whileHover="hover"
                    initial="nomal"
                    variants={boxVariants}
                    transition={{ type: "tween" }}
                    onClick={() => onBoxClick(tvshow.id, type)}
                    bgPhoto={makeImagePath(
                      tvshow.backdrop_path
                        ? tvshow.backdrop_path
                        : tvshow.poster_path,
                      "w500"
                    )}
                  >
                    <Info variants={infoVariants}>
                      <h4>
                        ⭐️{" "}
                        {tvshow.vote_average ? tvshow.vote_average : "No Data"}
                      </h4>
                    </Info>
                    <MovieTitle>
                      <h4>{tvshow.original_name}</h4>
                    </MovieTitle>
                  </Box>
                </>
              ))}
          </Row>
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {bigTvShowsMatch ? (
          <TvDetail
            type={bigTvShowsMatch.params.type}
            id={bigTvShowsMatch.params.tvshowId}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default TvSlider;
