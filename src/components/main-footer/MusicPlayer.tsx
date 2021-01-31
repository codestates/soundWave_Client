import { useDispatch, useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { RootState } from "../../reducer";
import { FaPause, FaPlayCircle } from "react-icons/fa";
import { IoVolumeHighSharp, IoVolumeMute } from "react-icons/io5";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SW_CLIENT_ID } from "../../const";
import { setMusicVolume } from "../../reducer/footerReducer";

const topRight = keyframes`
    0% {
        width: 0;
        height: 0;
        visibility: visible;
    }
    25% {
        width: 100%;
        height: 0;
        visibility: visible;
    }
    50% {
        height: 100%;
        width: 100%;
        visibility: visible;
    }
    100%{
        height: 100%;
        width: 100%;
        visibility: visible;
    }
`;
const bottomLeft = keyframes`
    0%{
        width: 0;
        height: 0;
        visibility: hidden;
    }
    50% {
        width: 0;
        height: 0;
        visibility: hidden;
    }
    75% {
        height: 0;
        width: 100%;
        visibility: visible;
    }
    100% {
        height: 100%;
        width: 100%;
        visibility: visible;
    }
`;
const Top = styled.div<ButtonProps>`
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  border-top: 2px solid white;
  border-right: 2px solid white;
  top: -2px;
  left: -2px;
  padding-right: 2px;
  content: "";
  ${({ isPlaying }) =>
    !isPlaying &&
    css`
      border-top: 2px solid transparent;
      border-right: 2px solid transparent;
    `}
  transition: all 0.5s;
`;
const Bottom = styled.div<ButtonProps>`
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid white;
  border-left: 2px solid white;
  bottom: -2px;
  right: -2px;
  padding-left: 2px;
  content: "";
  ${({ isPlaying }) =>
    !isPlaying &&
    css`
      border-bottom: 2px solid transparent;
      border-left: 2px solid transparent;
    `}
  transition: all 0.5s;
`;
type ContainerProps = {
  musicUrl: string;
};
const Container = styled.div<ContainerProps>`
  position: relative;
  ${({ musicUrl }) =>
    musicUrl &&
    css`
      ${Top} {
        animation: ${topRight} 1s 0.5s ease-in-out forwards;
      }

      ${Bottom} {
        animation: ${bottomLeft} 1s 0.5s ease-in-out forwards;
      }
    `}
`;

const Player = styled.div<ContainerProps>`
  padding: 5px;
  opacity: 0;
  margin: 5px;
  width: 300px;
  height: 50px;
  position: relative;
  /* z-index: 1; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  ${({ musicUrl }) =>
    musicUrl &&
    css`
      opacity: 1;
    `}
  transition: opacity 1s 1.5s;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const VolumeContainer = styled.div`
  width: 90px;
  height: 30px;
  display: flex;
  justify-content: flex-start;
`;
const Volume = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const VoluemButton = styled.div<ButtonProps>`
  cursor: pointer;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  background-color: transparent;
  color: white;
  &:hover {
    background-color: white;
    color: black;
  }
  ${({ isPlaying }) =>
    !isPlaying &&
    css`
      color: red;
      &:hover {
        background-color: red;
        color: white;
      }
    `}
  transition: all 0.5s;
`;

const VolumeControllerContainer = styled.div`
  display: flex;
  height: 15px;
  align-items: center;
  justify-content: center;
`;
const VolumeController = styled.input<ButtonProps>`
  appearance: none;
  cursor: pointer;
  outline: none;
  height: 1px;
  background-color: white;
  width: 40px;
  ${({ isPlaying }) =>
    !isPlaying &&
    css`
      background-color: red;
    `}
  &::-webkit-slider-thumb {
    cursor: pointer;
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
    &:hover {
      background-color: white;
    }
  }
  transition: all 0.5s;
`;
const ButtonContainer = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
`;
type ButtonProps = {
  isPlaying: boolean;
};
const Button = styled.div<ButtonProps>`
  cursor: pointer;
  width: 20px;
  height: 20px;
  ${({ isPlaying }) =>
    !isPlaying &&
    css`
      color: red;
      border-radius: 50%;
      background-color: white;
      &:active {
        opacity: 0;
        color: white;
        border-radius: 10px;
      }
    `}
  ${({ isPlaying }) =>
    isPlaying &&
    css`
      &:active {
        opacity: 0;
        color: red;
        background-color: white;
        border-radius: 10px;
      }
    `}
  transition: all .5s;
`;

const Time = styled.div<ButtonProps>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  width: 90px;
  height: 30px;
  color: red;
  ${({ isPlaying }) =>
    isPlaying &&
    css`
      color: black;
      text-shadow: -1px -1px 1px white, -1px 1px 1px white, 1px -1px 1px white,
        1px 1px 1px white;
    `}
  transition: all 0.5s;
  & p {
    margin: 0;
  }
`;
const DurationController = styled.input<ButtonProps>`
  cursor: pointer;
  overflow: hidden;
  height: 5px;
  width: 80%;
  outline: none;
  appearance: none;
  background-color: transparent;
  border-radius: 10px;
  &:hover {
    background-color: white;
  }
  transition: all 0.5s;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 1px;
    height: 5px;
    background-color: white;
    box-shadow: -250px 0 0 250px white;
    &:hover {
      background-color: black;
    }
    ${({ isPlaying }) =>
      !isPlaying &&
      css`
        background-color: red;
        box-shadow: -250px 0 0 250px red;
        &:hover {
          background-color: white;
        }
      `}
    transition: all 0.5s;
  }
`;
function MusicPlayer() {
  const dispatch = useDispatch();
  const audio = useRef<HTMLAudioElement>(new Audio());
  const musicUrl = useSelector(
    (state: RootState) => state.musicSearch.musicUrl
  );
  const volume = useSelector((state: RootState) => state.footer.musicVolume);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [lastVolume, setLastVolume] = useState(0);

  useEffect(() => {
    const { current } = audio;
    current.autoplay = true;
    current.loop = true;
    const setData = () => {
      setIsPlaying(true);
      setCurrentTime(current.currentTime);
      setDuration(current.duration);
    };
    const changeTime = () => {
      setCurrentTime(current.currentTime);
    };
    current.addEventListener("loadeddata", setData);
    current.addEventListener("timeupdate", changeTime);
    return () => {
      current.removeEventListener("loadeddata", setData);
      current.removeEventListener("timeupdate", changeTime);
    };
  }, [dispatch]);
  useEffect(() => {
    const { current } = audio;
    if (musicUrl) {
      if (current.src !== window.location.href) {
        setIsPlaying(false);
      }
      current.src = `${musicUrl}?client_id=${SW_CLIENT_ID}`;
    } else {
      current.src = "";
    }
  }, [musicUrl]);
  useEffect(() => {
    const { current } = audio;
    current.volume = volume / 100;
  }, [volume]);
  function ChangeVolume(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setMusicVolume(parseInt(e.target.value)));
  }

  function mute() {
    const { current } = audio;
    setLastVolume(current.volume * 100);
    dispatch(setMusicVolume(0));
  }
  function turnOn() {
    dispatch(setMusicVolume(lastVolume));
  }
  function pause() {
    audio.current.pause();
    setIsPlaying(false);
  }
  function play() {
    audio.current.play();
    setIsPlaying(true);
  }
  function ChangeCurrentTime(e: ChangeEvent<HTMLInputElement>) {
    audio.current.currentTime = Number(e.target.value);
  }

  return (
    <Container musicUrl={musicUrl}>
      <Top isPlaying={isPlaying} />
      <Bottom isPlaying={isPlaying} />
      <Player musicUrl={musicUrl}>
        <Row>
          <VolumeContainer>
            <Volume>
              <VoluemButton isPlaying={isPlaying}>
                {volume === 0 ? (
                  <IoVolumeMute size="15" onClick={turnOn} />
                ) : (
                  <IoVolumeHighSharp size="15" onClick={mute} />
                )}
              </VoluemButton>
              <VolumeControllerContainer>
                <VolumeController
                  isPlaying={isPlaying}
                  type="range"
                  value={volume}
                  onChange={ChangeVolume}
                />
              </VolumeControllerContainer>
            </Volume>
          </VolumeContainer>
          <ButtonContainer>
            <Button isPlaying={isPlaying}>
              {isPlaying ? (
                <FaPause size="20" onClick={pause} />
              ) : (
                <FaPlayCircle size="20" onClick={play} />
              )}
            </Button>
          </ButtonContainer>
          <Time isPlaying={isPlaying}>
            <p>
              {getTime(currentTime)} | {getTime(duration)}
            </p>
          </Time>
        </Row>
        <DurationController
          isPlaying={isPlaying}
          type="range"
          value={currentTime}
          max={duration}
          onChange={ChangeCurrentTime}
        />
      </Player>
    </Container>
  );
}
export default MusicPlayer;
function getTime(time: number): String {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time - minute * 60);
  return `${plusZero(minute)}:${plusZero(second)}`;
}
function plusZero(number: number): String {
  return String(number).length === 1 ? `0${number}` : `${number}`;
}
