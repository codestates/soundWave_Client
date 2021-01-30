import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { RootState } from "../../reducer";
import { hideSideBar } from "../../reducer/sideBarReducer";
import SideBar, { ContainerProps } from "./SideBar";

const Container = styled.div<ContainerProps>`
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: hidden;
  opacity: 0;
  ${({ isOpened }) =>
    isOpened &&
    css`
      opacity: 1;
    `}
  transition:opacity 0.5s;
`;
function SideBarModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isSideBarOpened = useSelector(
    (state: RootState) => state.sideBar.isSideBarOpened
  );
  function close() {
    dispatch(hideSideBar());
    setTimeout(() => {
      history.push("/");
    }, 500);
  }
  return (
    <Container isOpened={isSideBarOpened} onClick={close}>
      <SideBar />
    </Container>
  );
}

export default SideBarModal;
