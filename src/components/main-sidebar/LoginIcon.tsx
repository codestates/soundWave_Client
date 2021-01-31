import styled from "styled-components";
import { API_URL } from "../../const";

const Img = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 0 10px;
  border: 1px solid white;
  border-radius: 50%;
  &:active {
    transform: scale(0.8);
  }
  transition: transform 0.2s;
`;
type LoginIconProps = {
  src: string;
  auth: string;
};
function LoginIcon({ src, auth }: LoginIconProps) {
  function login() {
    window.open(`${API_URL}/auth/login/${auth}`, "_self");
  }
  return <Img src={src} onClick={login} />;
}
export default LoginIcon;
