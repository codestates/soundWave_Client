import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../reducer";

const Container = styled.div`
  height: 130px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: white solid 1px;
`;
const Text = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & p {
    margin: 10px;
  }
`;
function Profile() {
  const profile = useSelector((state: RootState) => state.sideBar.user.profile);
  const name = useSelector((state: RootState) => state.sideBar.user.name);
  return (
    <Container>
      <Img src={profile} alt="" />
      <Text>
        <p>안녕하세요.</p>
        <p>{name}님 반갑습니다.</p>
      </Text>
    </Container>
  );
}
export default Profile;
