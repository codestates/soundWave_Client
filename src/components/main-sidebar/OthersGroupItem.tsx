import { SyntheticEvent, useEffect, useState } from "react";
import { GiSoundWaves } from "react-icons/gi";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { RecommendRes } from "../../api";
import {
  turnOffAllNoise,
  turnOnNoise,
  setVolume,
  setMusicVolume,
} from "../../reducer/footerReducer";
import { pickMusic } from "../../reducer/musicSearchReducer";
import noUser from "../../images/no_user.svg";

type ContainerProps = {
  init: boolean;
  slide: boolean;
};

const Container = styled.div<ContainerProps>`
  cursor: pointer;
  width: 30%;
  height: 100%;
  color: white;
  background-color: #131d38;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: black;
    color: white;
    transition: all 0.5s;
  }
  &:active {
    background-color: #003066;
    transition: all 0.1s;
  }
  & p {
    font-size: 12px;
    margin: 5px;
    text-align: center;
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  opacity: 0;
  transform: translateX(130px);
  ${({ init }) =>
    init &&
    css`
      transition: all 0.2s;
      opacity: 1;
      transform: translateX(0);
    `}
  ${({ slide }) =>
    slide &&
    css`
      transition: all 0.2s;
      opacity: 0;
      transform: translateX(-300px);
    `}
  overflow: hidden;
`;
const NoContents = styled.div<ContainerProps>`
  width: 30%;
  background-color: rgba(255, 255, 255, 0.158);
  border-radius: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  opacity: 0;
  transform: translateX(300px);
  ${({ init }) =>
    init &&
    css`
      transition: all 0.2s;
      opacity: 1;
      transform: translateX(0);
    `}
  ${({ slide }) =>
    slide &&
    css`
      transition: all 0.2s;
      opacity: 0;
      transform: translateX(-300px);
    `}
`;
const Img = styled.img`
  border: 1px solid white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
`;
type GroupItemProps = RecommendRes & { slide: boolean };
function OthersGroupItem({
  noise,
  groupcombMusic,
  groupname,
  slide,
  musicVolume,
  user,
}: GroupItemProps) {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setInit(true);
    }, 100);
  }, []);
  function choose() {
    dispatch(turnOffAllNoise());
    noise.forEach((noise) => {
      dispatch(turnOnNoise(noise.noise.name));
      dispatch(setVolume({ name: noise.noise.name, volume: noise.volume }));
    });
    dispatch(pickMusic(groupcombMusic.musicUrl));
    dispatch(setMusicVolume(musicVolume === -1 ? 50 : musicVolume));
  }
  function handleImgError(event: SyntheticEvent) {
    const target = event.target as HTMLImageElement;
    target.src = noUser;
  }
  return (
    <>
      {groupname ? (
        <Container onClick={choose} init={init} slide={slide}>
          <Img src={user.profile} alt="프로필 사진" onError={handleImgError} />
          <p>{groupname}</p>
        </Container>
      ) : (
        <NoContents init={init} slide={slide}>
          <GiSoundWaves size="40" />
        </NoContents>
      )}
    </>
  );
}
export default OthersGroupItem;
