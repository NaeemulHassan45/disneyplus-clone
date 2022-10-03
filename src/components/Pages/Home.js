import styled from "styled-components";
import ImgSlider from "../Commons/ImgSlider";
import Viewers from "../Commons/Viewers";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import db from "../../firebase";

import { setMovies } from "../../features/movie/movieSlice";
import { selectUserName } from "../../features/user/userSlice";

const Home = () => {
  const dispath = useDispatch();
  const userName = useSelector(selectUserName);

  //let movieData = {};

  let RecommendMovies = [];
  let OriginalsMovies = [];
  let TrendingMovies = [];
  let NewDisneyMovies = [];

  useEffect(() => {
    assignMovies();
  }, [userName]);

  function assignMovies() {
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        // movieData.id = doc.id;
        // movieData.backgroundImg = doc.data().backgroundImg;
        // movieData.cardImg = doc.data().cardImg;
        // movieData.description = doc.data().description;
        // movieData.subTitle = doc.data().subTitle;
        // movieData.title = doc.data().title;
        // movieData.titleImg = doc.data().titleImg;
        // movieData.type = doc.data().type;
        if (doc.data().type === "recommend") {
          RecommendMovies = [...RecommendMovies, { id: doc.id, ...doc.data() }];
        } else if (doc.data().type === "new") {
          NewDisneyMovies = [...NewDisneyMovies, { id: doc.id, ...doc.data() }];
        } else if (doc.data().type === "original") {
          OriginalsMovies = [...OriginalsMovies, { id: doc.id, ...doc.data() }];
        } else if (doc.data().type === "trending") {
          TrendingMovies = [...TrendingMovies, { id: doc.id, ...doc.data() }];
        }
      });
      dispath(
        setMovies({
          recommend: RecommendMovies,
          newDisney: NewDisneyMovies,
          originals: OriginalsMovies,
          trending: TrendingMovies,
        })
      );
    });
  }

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
