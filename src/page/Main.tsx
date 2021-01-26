import Footer from "../components/main-footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../reducer";
import Modal from "../components/main-search/Modal";
import styled from "styled-components";
import SearchForm from "../components/main-search/SearchForm";
import mainRoad from "../components/main-animation/mainRoad";

const Container = styled.div`
  height: 100%;
  position: relative;
  background: linear-gradient(to bottom, #202020, #111119);
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;

function Main() {
  const isSearchOpen = useSelector(
    (state: RootState) => state.musicSearch.isSearchOpen
  );
  return (
    <Container>
      {mainRoad()}
      <Footer />
      {isSearchOpen && (
        <Modal>
          <SearchForm />
        </Modal>
      )}
    </Container>
  );
}

export default Main;
