import Footer from "../components/main-footer/Footer";
import raintest from "../components/main-animation/rainEffect";
import { useSelector } from "react-redux";
import { RootState } from "../reducer";
import SearchModal from "../components/main-search/SearchModal";
import styled from "styled-components";
import SearchForm from "../components/main-search/SearchForm";
import streetLamp from "../components/main-animation/streetLamp";
import bounceCar from "../components/main-animation/bounceCar";
import mainRoad from "../components/main-animation/mainRoad";

const Container = styled.div`
  height: 100%;
  position: relative;
  background: linear-gradient(to bottom, #202020, #111119);
`;
function Main() {
  const isSearchOpen = useSelector(
    (state: RootState) => state.musicSearch.isSearchOpen
  );
  return (
    <Container>
      {/* {raintest()} */}
      {mainRoad()}
      {/* {streetLamp()}
      {bounceCar()}; */}
      <Footer />
      {isSearchOpen && <SearchModal />}
    </Container>
  );
}

export default Main;
