import { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { RootState } from "../../reducer";
import { showSideBar } from "../../reducer/sideBarReducer";
import Login from "./Login";
import Profile from "./Profile";
import GroupForm from "./GroupForm";
import History from "./History";
import Recommend from "./Recommend";
import Footer from "./Footer";
export type ContainerProps = {
  isOpened: boolean;
};
const Container = styled.div<ContainerProps>`
  position: absolute;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateX(500px);
  ${({ isOpened }) =>
    isOpened &&
    css`
      transform: translateX(0);
    `}
  transition:transform 0.5s;
  display: flex;
  align-items: center;
`;
const Contents = styled.div`
  height: 95%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
function SideBar() {
  const dispatch = useDispatch();
  const isSideBarOpened = useSelector(
    (state: RootState) => state.sideBar.isSideBarOpened
  );
  const isLogedIn = useSelector((state: RootState) => state.sideBar.isLogedIn);
  useEffect(() => {
    dispatch(showSideBar());
  }, [dispatch]);
  function stop(e: MouseEvent) {
    e.stopPropagation();
  }

  return (
    <Container isOpened={isSideBarOpened} onClick={stop}>
      <Contents>
        {isLogedIn ? <Profile /> : <Login />}
        <GroupForm />
        <History />
        <Recommend />
        <Footer />
      </Contents>
    </Container>
  );
}
export default SideBar;
