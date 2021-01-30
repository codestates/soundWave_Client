import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
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
  const history = useHistory();
  function open() {
    history.push("/side");
  }
  return (
    <Container
      onClick={open}
      isSideBarOpen={history.location.pathname === "/side"}
      isSearchOpen={history.location.pathname === "/search"}
    >
      <BsReverseLayoutSidebarInsetReverse size="40" />
    </Container>
  );
}
export default SidebarButton;
