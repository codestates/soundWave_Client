import styled from "styled-components";
import { IoIosSave } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer";
const Container = styled.div`
  /* border: 1px solid white; */
  display: flex;
  justify-content: center;
`;
const Contents = styled.div`
  /* border: 1px solid black; */
  width: 300px;
  display: flex;
  justify-content: space-between;
`;
const Button = styled.div`
  border-radius: 10px;
  cursor: pointer;
  /* font-size: 30px; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 50px;
  background-color: red;
  color: white;
  &:hover {
    background-color: white;
    color: black;
  }
  transition: all 0.5s;
`;
const Input = styled.input`
  border: none;
  outline: none;
  width: 180px;
  padding: 15px;
  border-radius: 10px;
`;
function GroupForm() {
  const isLogedIn = useSelector((state: RootState) => state.sideBar.isLogedIn);

  function save() {
    if (isLogedIn) {
    } else {
    }
  }
  return (
    <Container>
      <Contents>
        <Button onClick={save}>
          <IoIosSave size="30" />
        </Button>
        <Input type="text" placeholder="이름을 붙여서 저장해 보세요." />
      </Contents>
    </Container>
  );
}
export default GroupForm;
