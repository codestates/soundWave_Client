import Footer from "../components/main-footer/Footer";
import SearchModal from "../components/main-search/SearchModal";
import styled from "styled-components";
import SidebarButton from "../components/main-sidebar/SidebarButton";
import SideBarModal from "../components/main-sidebar/SideBarModal";
import MainRoad from "../components/main-animation/mainRoad";
import { useEffect } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  position: relative;
  background: linear-gradient(to bottom, #202020, #111119);
  display: flex;
  justify-content: center;
`;

function Main() {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.hash === "#_=_") {
      history.push("/");
    }
  });

  return (
    <Container>
      <SidebarButton />
      <MainRoad />
      <Footer />
      <Route path="/search">
        <SearchModal />
      </Route>
      <Route path="/side">
        <SideBarModal />
      </Route>
    </Container>
  );
}

export default Main;
