import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../api";
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
  const histoty = useHistory();
  const dispatch = useDispatch();
  function click() {
    (async () => {
      await logout();
      dispatch(setAccessToken(""));
      dispatch(setUser({} as User));
      histoty.push("/");
    })();
  }
  return (
    <Container>
      <div>LOGO</div>
      <LogOutButton onClick={click}>logout</LogOutButton>
    </Container>
  );
}
export default Footer;
