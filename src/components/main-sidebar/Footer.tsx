import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../api";
import { setAccessToken, setUser, User } from "../../reducer/sideBarReducer";

const Container = styled.div`
  border: 1px solid white;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      <div onClick={click}>logout</div>
    </Container>
  );
}
export default Footer;
