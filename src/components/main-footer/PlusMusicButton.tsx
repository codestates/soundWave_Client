import styled from "styled-components";
import { Container, IconEngrave } from "./NoiseItem";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { TiPlusOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { openSearch } from "../../reducer/musicSearchReducer";
const Border = styled.div`
  border: 1px white dashed;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #313d45, #3d4850);
  box-shadow: inset 0px 4px 1px 1px #3d4850, inset 0px -3px 1px 1px #232b30;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  color: #9fa8b0;
  transition: all 0.1s linear;
  &:hover {
    color: white;
  }
  &:active {
    background-image: linear-gradient(to bottom, #252e34, #20282d);
    box-shadow: inset 0px -3px 1px 1px #232b30;
  }
`;
function PlusMusicButton() {
  const dispatch = useDispatch();
  function openSearchModal() {
    dispatch(openSearch());
  }
  return (
    <>
      <Container>
        <Border>
          <Circle onClick={openSearchModal}>
            <TiPlusOutline size="20" style={IconEngrave} />
            <IoMusicalNotesSharp size="30" style={IconEngrave} />
          </Circle>
        </Border>
      </Container>
    </>
  );
}

export default PlusMusicButton;
