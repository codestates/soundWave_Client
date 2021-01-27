import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { RootState } from "../../reducer";
import { openSideBar } from "../../reducer/sideBarReducer";
type ContainerProps = {
  isSideBarOpen: boolean;
  isSearchOpen: boolean;
};
const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: white;
  ${({ isSideBarOpen, isSearchOpen }) =>
    (isSideBarOpen || isSearchOpen) &&
    css`
      opacity: 0;
    `}
  transition:opacity 0.5s;
`;
function SidebarButton() {
  const dispatch = useDispatch();
  const isSideBarOpen = useSelector(
    (state: RootState) => state.sideBar.isSideBarOpen
  );
  const isSearchOpen = useSelector(
    (state: RootState) => state.musicSearch.isSearchOpen
  );
  function open() {
    dispatch(openSideBar());
  }
  return (
    <Container
      onMouseEnter={open}
      isSideBarOpen={isSideBarOpen}
      isSearchOpen={isSearchOpen}
    >
      <BsReverseLayoutSidebarInsetReverse size="40" />
    </Container>
  );
}
export default SidebarButton;
