import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IconType } from "react-icons";
import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import NoiseVolumeController from "./NoiseVolumeController";
type NoiseItemProps = {
  url: string;
  info: [string, IconType];
};
export const Container = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 20px 20px;
  display: flex;
  justify-content: center;
`;
const ToggleButton = styled.button`
  outline: none;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #9fa8b0;
  border: 1px solid #1c252b;
  background: linear-gradient(to bottom, #3d4850 1%, #313d45 4%, #232b30 100%);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  &:hover {
    color: white;
    background: linear-gradient(
      to bottom,
      #4c5a64 1%,
      #404f5a 4%,
      #2e3940 100%
    );
  }
  &:active {
    position: relative;
    top: 1px;
    color: #fff;
    padding: 6px 12px 4px;
    background: linear-gradient(
      to bottom,
      #20282d 1%,
      #252e34 51%,
      #222a30 100%
    );
    box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.1);
  }
`;
const NoiseName = styled.p`
  margin: 5px;
`;
function NoiseItem({ url, info }: NoiseItemProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const [isShowing, setIsShowing] = useState<boolean>();
  const audio = useRef<HTMLAudioElement>(null!);
  useEffect(() => {
    audio.current = new Audio(
      `https://api.soundcloud.com/tracks/${url}/stream?client_id=3c1222aaa64b9dc73bc257260a5497cb`
    );
    function restartNoise() {
      startNoise();
    }
    audio.current.addEventListener("ended", restartNoise);
    return () => {
      audio.current.removeEventListener("ended", restartNoise);
    };
  }, [url]);
  function startNoise() {
    audio.current.currentTime = 30;
    audio.current.play();
  }
  function toggleNoise() {
    if (audio.current.paused) {
      startNoise();
      setIsPlaying(true);
    } else {
      audio.current.pause();
      setIsPlaying(false);
    }
  }
  function showNoiseVolumeController() {
    setIsShowing(true);
  }
  function hideNoiseVolumeController() {
    setIsShowing(false);
  }
  const [name, Icon] = info;
  return (
    <>
      <Container
        onMouseEnter={showNoiseVolumeController}
        onMouseLeave={hideNoiseVolumeController}
      >
        <ToggleButton onClick={toggleNoise}>
          <Icon size="50" />
          <NoiseName>{name}</NoiseName>
          {isPlaying ? (
            <>
              <BsStopFill size="20" />
            </>
          ) : (
            <BsFillPlayFill size="20" />
          )}
        </ToggleButton>
        {isPlaying && isShowing && (
          <NoiseVolumeController audio={audio.current} />
        )}
      </Container>
    </>
  );
}

export default NoiseItem;
