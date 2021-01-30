import { useEffect, useState } from "react";
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
type ContainerProps = {
  isShow: boolean;
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
  ${({ isShow }) =>
    isShow &&
    css`
      transition: all 0.5s;
      opacity: 1;
      transform: translateX(0);
    `}
  ${({ slide }) =>
    slide &&
    css`
      transition: all 0.5s;
      opacity: 0;
      transform: translateX(-130px);
    `}
  overflow: hidden;
`;
const NoContents = styled.div`
  width: 30%;
  height: 100%;
`;
const Img = styled.img`
  border: 1px solid white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
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
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
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

  return (
    <>
      {groupname ? (
        <Container onClick={choose} isShow={isShow} slide={slide}>
          <Img src={user.profile} alt="" />
          <p>{groupname}</p>
        </Container>
      ) : (
        <NoContents />
      )}
    </>
  );
}
export default OthersGroupItem;
