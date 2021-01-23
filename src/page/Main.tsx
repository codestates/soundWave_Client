import Footer from "../components/main-footer/Footer";
import raintest from "../components/main-animation/rainEffect";
import { useSelector } from "react-redux";
import { RootState } from "../reducer";
import Modal from "../components/main-search/Modal";
import styled from "styled-components";
import SearchForm from "../components/main-search/SearchForm";
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
