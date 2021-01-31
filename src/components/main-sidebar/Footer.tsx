import { useSelector } from "react-redux";
import styled from "styled-components";
import { logout } from "../../api";
import { RootState } from "../../reducer";
import logo1 from "../../logo/logo.png";
import logo2 from "../../logo/whitesimplelogo.png";
const Container = styled.div`
  height: 70px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
type LogoProps = {
  logo1: string;
  logo2: string;
};
const Logo = styled.div<LogoProps>`
  width: 150px;
  height: 35px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  transition: all 0.5s;
  background-image: url(${({ logo1 }) => logo1});
  &:hover {
    background-image: url(${({ logo2 }) => logo2});
  }
`;
const LogOutButton = styled.div`
  height: 35px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #afa0a0;
    color: black;
  }
  &:active {
    background-color: #814e4e;
    color: black;
    transition: all 0.1s;
  }
`;
function Footer() {
  const accessToken = useSelector(
    (state: RootState) => state.sideBar.accessToken
  );
  function click() {
    (async () => {
      await logout();
      window.location.href = "/";
    })();
  }
  return (
    <Container>
      <Logo logo1={logo1} logo2={logo2} />
      {accessToken && <LogOutButton onClick={click}>logout</LogOutButton>}
    </Container>
  );
}
export default Footer;
