import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { RootState } from "../../reducer";
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
  const isSideBarOpened = useSelector(
    (state: RootState) => state.sideBar.isSideBarOpened
  );
  return (
    <Container isOpened={isSideBarOpened}>
      <SideBar />
    </Container>
  );
}

export default SideBarModal;
