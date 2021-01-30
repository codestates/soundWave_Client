import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout } from "../../api";
import { RootState } from "../../reducer";
import { setAccessToken, setUser, User } from "../../reducer/sideBarReducer";

const Container = styled.div`
  margin-top: 10px;
  height: 70px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const LogOutButton = styled.div`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #afa0a0;
    color: black;
    transition: all 0.5s;
  }
  &:active {
    background-color: #814e4e;
    color: black;
    transition: all 0.1s;
  }
`;
function Footer() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.sideBar.accessToken
  );
  function click() {
    (async () => {
      await logout();
      dispatch(setAccessToken(""));
      dispatch(setUser({} as User));
      window.location.href = "/";
    })();
  }
  return (
    <Container>
      <div>LOGO</div>
      {accessToken && <LogOutButton onClick={click}>logout</LogOutButton>}
    </Container>
  );
}
export default Footer;
