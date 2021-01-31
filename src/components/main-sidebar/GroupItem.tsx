import { MouseEvent, useEffect, useState } from "react";
import { GiSoundWaves } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { deleteGroup, getGroups } from "../../api";
import { RootState } from "../../reducer";
import {
  turnOffAllNoise,
  turnOnNoise,
  setVolume,
  setMusicVolume,
} from "../../reducer/footerReducer";
import { pickMusic } from "../../reducer/musicSearchReducer";
import { Group, setGroupList } from "../../reducer/sideBarReducer";
import { weathers } from "./GroupForm";

type ContainerProps = {
  init: boolean;
  slide: boolean;
};

const Container = styled.div<ContainerProps>`
  cursor: pointer;
  width: 30%;
  height: 100%;
  color: black;
  background-color: white;
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
    margin: 5px;
    text-align: center;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
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
const DeleteButton = styled.p`
  position: absolute;
  bottom: 0;
  font-size: 8px;
  color: red;
  width: 50px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  &:hover {
    color: white;
  }
  &:active {
    background-color: black;
  }
`;
type GroupItemProps = Group & { slide: boolean };
function GroupItem({
  noises,
  music,
  groupName,
  slide,
  groupId,
  weather,
}: GroupItemProps) {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.sideBar.accessToken
  );
  const userId = useSelector((state: RootState) => state.sideBar.user.userId);
  const [init, setInit] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setInit(true);
    }, 100);
  }, []);
  function choose() {
    dispatch(turnOffAllNoise());
    noises.forEach((noise) => {
      dispatch(turnOnNoise(noise.name));
      dispatch(setVolume({ name: noise.name, volume: noise.volume }));
    });
    dispatch(pickMusic(music.url));
    dispatch(setMusicVolume(music.volume === -1 ? 50 : music.volume));
  }
  function clickDelete(e: MouseEvent) {
    e.stopPropagation();
    (async () => {
      await deleteGroup(accessToken, groupId);
      try {
        const { data } = await getGroups(accessToken, userId);
        dispatch(setGroupList(data.filter((el) => el.weather === weather)));
      } catch {
        dispatch(setGroupList([]));
      }
    })();
  }

  return (
    <>
      {groupName ? (
        <Container onClick={choose} init={init} slide={slide}>
          {(() => {
            for (let i = 0; i < weathers.length; i++) {
              if (weathers[i].name === weather) {
                const Icon = weathers[i].Icon;
                return <Icon color="black" />;
              }
            }
          })()}
          <p>{groupName}</p>
          <DeleteButton onClick={clickDelete}>delete</DeleteButton>
        </Container>
      ) : (
        <NoContents init={init} slide={slide}>
          <GiSoundWaves size="40" />
        </NoContents>
      )}
    </>
  );
}
export default GroupItem;
