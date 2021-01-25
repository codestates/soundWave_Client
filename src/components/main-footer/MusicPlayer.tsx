import { useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { RootState } from "../../reducer";
import { FaPause, FaPlayCircle } from "react-icons/fa";
import { IoVolumeHighSharp, IoVolumeMute } from "react-icons/io5";
import { ChangeEvent, useEffect, useRef, useState } from "react";

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
type ContainerProps = {
  musicUrl: string;
};
const Top = styled.div<ButtonProps>`
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  border-top: 5px solid white;
  border-right: 5px solid white;
  top: -5px;
  left: -5px;
  padding-right: 5px;
  content: "";
  ${({ isPlaying }) =>
    !isPlaying &&
    css`
      border-top: 5px solid transparent;
      border-right: 5px solid transparent;
    `}
  transition: all 0.5s;
`;
const Bottom = styled.div<ButtonProps>`
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  border-bottom: 5px solid white;
  border-left: 5px solid white;
  bottom: -5px;
  right: -5px;
  padding-left: 5px;
  content: "";
  ${({ isPlaying }) =>
    !isPlaying &&
    css`
      border-bottom: 5px solid transparent;
      border-left: 5px solid transparent;
    `}
  transition: all 0.5s;
`;
const Container = styled.div<ContainerProps>`
  position: relative;
  ${({ musicUrl }) =>
    musicUrl &&
    css`
      ${Top} {
        animation: ${topRight} 1s ease-in-out forwards;
      }

      ${Bottom} {
        animation: ${bottomLeft} 1s ease-in-out forwards;
      }
    `}
`;

const Player = styled.div`
  margin: 10px;
  width: 500px;
  height: 50px;
  position: relative;
  /* z-index: 1; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;
type ButtonProps = {
  isPlaying: boolean;
};
const Button = styled.div<ButtonProps>`
  cursor: pointer;
  display: flex;
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
  transition: all 0.5s;
`;
const Time = styled.div<ButtonProps>`
  font-size: 14px;
  text-align: center;
  width: 100px;
  color: red;
  ${({ isPlaying }) =>
    isPlaying &&
    css`
      color: black;
      text-shadow: -2px -2px 2px white, -2px 2px 2px white, 2px -2px 2px white,
        2px 2px 2px white;
    `}
  transition: all 0.5s;
  & p {
    margin: 10px;
  }
`;
const DurationController = styled.input<ButtonProps>`
  overflow: hidden;
  width: 250px;
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
    height: 10px;
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

const VoluemCtainer = styled.div<ButtonProps>`
  cursor: pointer;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;

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

const OnVolume = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const VolumeController = styled.input<ButtonProps>`
  appearance: none;
  cursor: pointer;
  outline: none;
  height: 1px;
  background-color: white;
  width: 50px;
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
function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(new Audio());
  const musicUrl = useSelector(
    (state: RootState) => state.musicSearch.musicUrl
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (musicUrl) {
      const { current } = audio;
      const setData = () => {
        setCurrentTime(current.currentTime);
        setDuration(current.duration);
        setVolume(current.volume);
      };
      const changeTime = () => {
        setCurrentTime(current.currentTime);
      };
      const changeVolume = () => {
        setVolume(current.volume);
      };
      current.src = `${musicUrl}?client_id=3c1222aaa64b9dc73bc257260a5497cb`;
      current.autoplay = true;
      current.loop = true;
      current.addEventListener("loadeddata", setData);
      current.addEventListener("timeupdate", changeTime);
      current.addEventListener("volumechange", changeVolume);
      return () => {
        current.removeEventListener("loadeddata", setData);
        current.removeEventListener("timeupdate", changeTime);
        current.removeEventListener("volumechange", changeVolume);
      };
    }
  }, [musicUrl]);
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
  function ChangeVolume(e: ChangeEvent<HTMLInputElement>) {
    audio.current.volume = Number(e.target.value) / 100;
  }
  function mute() {
    audio.current.volume = 0;
  }
  return (
    <Container musicUrl={musicUrl}>
      <Top isPlaying={isPlaying} />
      <Bottom isPlaying={isPlaying} />
      {musicUrl && (
        <>
          <Player>
            <Button isPlaying={isPlaying}>
              {isPlaying ? (
                <FaPause size="40" onClick={pause} />
              ) : (
                <FaPlayCircle size="40" onClick={play} />
              )}
            </Button>
            <OnVolume>
              <VoluemCtainer isPlaying={isPlaying} onClick={mute}>
                {volume === 0 ? (
                  <IoVolumeMute size="20" />
                ) : (
                  <IoVolumeHighSharp size="20" />
                )}
              </VoluemCtainer>
              <VolumeController
                isPlaying={isPlaying}
                type="range"
                value={volume * 100}
                onChange={ChangeVolume}
              />
            </OnVolume>
            <DurationController
              isPlaying={isPlaying}
              type="range"
              value={currentTime}
              max={duration}
              onChange={ChangeCurrentTime}
            />
            <Time isPlaying={isPlaying}>
              {getTime(currentTime)} | {getTime(duration)}
            </Time>
          </Player>
        </>
      )}
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
