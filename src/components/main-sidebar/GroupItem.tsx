import { MouseEvent, useEffect, useState } from "react";
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
type ContainerProps = {
  isShow: boolean;
  slide: boolean;
};

const Container = styled.div<ContainerProps>`
  cursor: pointer;
  width: 30%;
  height: 100%;
  color: black;
  background-color: #93da72;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #dad872;
    transition: all 0.5s;
  }
  &:active {
    background-color: #da8f72;
    transition: all 0.1s;
  }
  & p {
    margin: 5px;
    text-align: center;
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
const DeleteButton = styled.p`
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
}: GroupItemProps) {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.sideBar.accessToken
  );
  const userId = useSelector((state: RootState) => state.sideBar.user.userId);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 100);
  }, []);
  function choose() {
    console.log("choose");
    dispatch(turnOffAllNoise());
    noises.forEach((noise) => {
      dispatch(turnOnNoise(noise.name));
      dispatch(setVolume({ name: noise.name, volume: noise.volume }));
    });
    dispatch(pickMusic(music.url));
    dispatch(setMusicVolume(music.volume));
  }
  function clickDelete(e: MouseEvent) {
    e.stopPropagation();
    (async () => {
      await deleteGroup(accessToken, groupId);
      try {
        const { data } = await getGroups(accessToken, userId);
        dispatch(setGroupList(data));
      } catch {
        dispatch(setGroupList([]));
      }
    })();
  }
  return (
    <>
      {groupName ? (
        <Container onClick={choose} isShow={isShow} slide={slide}>
          <p>{groupName}</p>
          <DeleteButton onClick={clickDelete}>delete</DeleteButton>
        </Container>
      ) : (
        <NoContents />
      )}
    </>
  );
}
export default GroupItem;
