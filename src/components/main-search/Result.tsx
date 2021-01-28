import { Container } from "./NoResult";
import { IoIosImages } from "react-icons/io";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import {
  closeSearch,
  pickMusic,
  listenSample,
} from "../../reducer/musicSearchReducer";
import { Music } from "../../api";
import { FiPlay, FiSquare } from "react-icons/fi";
type RowProps = {
  isSelected: boolean;
  isPicked: boolean;
};
const Row = styled.div<RowProps>`
  border: white ridge 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  &:hover {
    background-color: white;
    color: black;
  }
  transition: all 0.5s;
  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: pink;
    `}
  ${({ isPicked }) =>
    isPicked &&
    css`
      background-color: red;
    `}
`;
const Img = styled.img`
  width: 70px;
  height: 70px;
`;
const ImgIns = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const P = styled.p`
  margin: 5px;
`;
const Title = styled.div`
  width: 150px;
  overflow: hidden;
`;
const TitleP = styled.p`
  display: inline-block;
  white-space: nowrap;
  transform: translateX(0);
  transition: transform 8s;
  &:hover {
    transform: translateX(-100%);
  }
`;
const ClickText = styled.div`
  cursor: pointer;
  &:hover {
    color: red;
  }
  & p {
    width: 50px;
  }
`;
type ResultProps = {
  music: Music;
  isSelected: boolean;
  isPicked: boolean;
};
function Result({ music, isSelected, isPicked }: ResultProps) {
  const dispatch = useDispatch();
  function listen() {
    if (isSelected) {
      dispatch(listenSample(""));
      return;
    }
    dispatch(listenSample(music.stream_url));
  }
  function pick() {
    dispatch(pickMusic(music.stream_url));
    dispatch(closeSearch());
  }
  return (
    <Container>
      <Row isSelected={isSelected} isPicked={isPicked}>
        {music.artwork_url ? (
          <Img src={music.artwork_url} alt={music.title} />
        ) : (
          <ImgIns>
            <IoIosImages size="30px" />
            <P>no image</P>
          </ImgIns>
        )}
        <Title>
          <TitleP>{music.title}</TitleP>
        </Title>
        <ClickText onClick={listen}>
          {!isPicked && (isSelected ? <FiSquare /> : <FiPlay />)}
        </ClickText>
        <ClickText onClick={pick}>
          {isPicked ? <p>PICKED</p> : <p>PICK</p>}
        </ClickText>
      </Row>
    </Container>
  );
}
export default Result;
