import { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { RootState } from "../../reducer";
import { hideSideBar, showSideBar } from "../../reducer/sideBarReducer";
import Login from "./Login";
import Profile from "./Profile";
import GroupForm from "./GroupForm";
import History from "./History";
import Recommend from "./Recommend";
import Footer from "./Footer";
import { RiCloseFill } from "react-icons/ri";
import Err from "./Err";
import { useHistory } from "react-router-dom";
import OthersHistory from "./OthersHistory";
export type ContainerProps = {
  isOpened: boolean;
};
const Container = styled.div<ContainerProps>`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  position: absolute;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
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
const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  background-color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  top: 10px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Contents = styled.div`
  height: 95%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & section {
    /* border: white 1px solid; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const AuthSection = styled.section`
  height: 15%;
`;
const SaveSection = styled.section`
  height: 15%;
`;
const ListSection = styled.section`
  height: 15%;
`;
const RecommendSection = styled.section`
  height: 25%;
`;
const FooterSection = styled.section`
  height: 10%;
`;
function SideBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isSideBarOpened = useSelector(
    (state: RootState) => state.sideBar.isSideBarOpened
  );
  const accessToken = useSelector(
    (state: RootState) => state.sideBar.accessToken
  );
  const errorMessage = useSelector(
    (state: RootState) => state.sideBar.errorMessage
  );
  useEffect(() => {
    dispatch(showSideBar());
  }, [dispatch]);
  function close() {
    dispatch(hideSideBar());
    setTimeout(() => {
      history.push("/");
    }, 500);
  }
  function stop(e: MouseEvent) {
    e.stopPropagation();
  }
  return (
    <Container isOpened={isSideBarOpened} onClick={stop}>
      <CloseButton onClick={close}>
        <RiCloseFill color="black" />
      </CloseButton>
      <Contents>
        <AuthSection>{accessToken ? <Profile /> : <Login />}</AuthSection>
        <SaveSection>
          <GroupForm />
        </SaveSection>
        <ListSection>
          <History />
        </ListSection>
        <RecommendSection>
          <Recommend />
        </RecommendSection>
        <ListSection>
          <OthersHistory />
        </ListSection>
        <FooterSection>
          <Footer />
        </FooterSection>
      </Contents>
      {errorMessage && <Err message={errorMessage} />}
    </Container>
  );
}
export default SideBar;
