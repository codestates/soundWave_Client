import { Container } from "./NoResult";
import { Music } from "./SearchForm";
import { IoIosImages } from "react-icons/io";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { closeSearch, pickMusic } from "../../reducer/musicSearchReducer";

type ResultProps = {
  music: Music;
  audio: HTMLAudioElement;
};
const Row = styled.div`
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
`;
const Img = styled.img`
  width: 90px;
  height: 90px;
`;
const ImgIns = styled.div`
  width: 90px;
  height: 90px;
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
`;
function Result({ music, audio }: ResultProps) {
  const dispatch = useDispatch();
  function listenSample() {
    audio.src = `${music.stream_url}?client_id=3c1222aaa64b9dc73bc257260a5497cb`;
    audio.play();
  }
  function pick() {
    dispatch(pickMusic(music.stream_url));
    dispatch(closeSearch());
  }
  return (
    <Container>
      <Row>
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
        <ClickText onClick={listenSample}>SAMPLE</ClickText>
        <ClickText onClick={pick}>PICK</ClickText>
      </Row>
    </Container>
  );
}
export default Result;
