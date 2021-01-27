import styled from "styled-components";

const Img = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 10px;
  border: 1px solid white;
  overflow: hidden;
  border-radius: 50%;
`;
type LoginIconProps = {
  src: string;
};
function LoginIcon({ src }: LoginIconProps) {
  return <Img src={src} />;
}
export default LoginIcon;
