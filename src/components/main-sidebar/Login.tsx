import styled from "styled-components";
import LoginIcon from "./LoginIcon";
const Container = styled.div`
  height: 130px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Row = styled.div``;
function Login() {
  return (
    <Container>
      <p>LOGIN with</p>
      <Row>
        <LoginIcon src="static/media/login/facebook_icon-icons.com_53612.svg" />
        <LoginIcon src="static/media/login/google_plus_icon-icons.com_53608.svg" />
        {/* <LoginIcon src="static/media/login/naver_icon-icons.com_61634.svg" />
        <LoginIcon src="static/media/login/talk_icon-icons.com_53596.svg" /> */}
      </Row>
    </Container>
  );
}
export default Login;