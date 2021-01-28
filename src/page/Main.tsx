import Footer from "../components/main-footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../reducer";
import SearchModal from "../components/main-search/SearchModal";
import styled from "styled-components";
import SidebarButton from "../components/main-sidebar/SidebarButton";
import SideBarModal from "../components/main-sidebar/SideBarModal";
import MainRoad from "../components/main-animation/mainRoad";
const Container = styled.div`
  height: 100%;
  position: relative;
  background: linear-gradient(to bottom, #202020, #111119);
  display: flex;
  justify-content: center;
`;

function Main() {
  const isSearchOpen = useSelector(
    (state: RootState) => state.musicSearch.isSearchOpen
  );
  const isSideBarOpen = useSelector(
    (state: RootState) => state.sideBar.isSideBarOpen
  );
  return (
    <Container>
      <SidebarButton />
      <MainRoad />
      <Footer />
      {isSearchOpen && <SearchModal />}
      {isSideBarOpen && <SideBarModal />}
    </Container>
  );
}

export default Main;
