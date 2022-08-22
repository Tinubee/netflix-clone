import {
  faSquareCaretLeft,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import MovieDetail from "./MovieDetail";

export const Slider = styled.div`
  position: relative;
  height: 50vh;
`;

export const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
`;

export const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

export const MovieTitle = styled.div`
  font-weight: 800;
  font-size: 18px;
  margin-top: 210px;
`;

export const TypeText = styled.div`
  margin: 20px 0px 10px 0px;
  padding-left: 10px;
  color: white;
  font-weight: 800;
  font-size: 36px;
`;

export const boxVariants = {
  normal: {
    scale: 1,
    type: "tween",
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

export const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};
export const offset = 6;

export const IconContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const PrevIcon = styled(motion.div)`
  width: 60px;
  left: 0;
  font-size: 50px;
  cursor: pointer;
`;
export const NextIcon = styled(PrevIcon)``;

export const IconVariants = {
  initial: {
    opacity: 0.3,
  },
  hover: {
    opacity: 1,
  },
};

interface IProps {
  type: string;
  data?: IGetMoviesResult;
}
function MovieSlider({ data, type }: IProps) {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string; type: string }>(
    "/movies/:type/:movieId"
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const discreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex - 1 : prev - 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClick = (movieId: number, type: string) => {
    history.push(`/movies/${type}/${movieId}`);
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
              .map((movie: any) => (
                <>
                  <Box
                    key={movie.id + type}
                    whileHover="hover"
                    initial="nomal"
                    variants={boxVariants}
                    transition={{ type: "tween" }}
                    onClick={() => onBoxClick(movie.id, type)}
                    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  >
                    <Info variants={infoVariants}>
                      <h4>
                        ⭐️{" "}
                        {movie.vote_average ? movie.vote_average : "No Data"}
                      </h4>
                    </Info>
                    <MovieTitle>
                      <h4>{movie.original_title}</h4>
                    </MovieTitle>
                  </Box>
                </>
              ))}
          </Row>
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {bigMovieMatch ? (
          <MovieDetail
            type={bigMovieMatch.params.type}
            id={bigMovieMatch.params.movieId}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default MovieSlider;
