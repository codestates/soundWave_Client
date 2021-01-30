import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { setErr } from "../../reducer/sideBarReducer";
const shaking = keyframes`
  0% { 
    transform: translate(30px); 
  }
  20% { 
    transform: translate(-30px); 
  }
  40% { 
    transform: translate(15px); 
  }
  60% { 
    transform: translate(-15px); 
  }
  80% { 
    transform: translate(8px); 
  }
  100% { 
    transform: translate(0px); 
  }
`;
const Container = styled.div`
  font-size: 12px;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40%;
  background-color: white;
  padding: 30px 20px 20px;
  border-radius: 10px;
  text-align: center;
  & p {
    margin: 0;
  }
  animation: ${shaking} 0.4s 1 linear;
`;
const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  background-color: black;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  top: 10px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
type ErrProps = {
  message: string;
};
function Err({ message }: ErrProps) {
  const dispatch = useDispatch();
  function close() {
    dispatch(setErr(""));
  }
  return (
    <Container>
      <CloseButton onClick={close}>
        <RiCloseFill color="white" />
      </CloseButton>
      <p>{message}</p>
    </Container>
  );
}
export default Err;
