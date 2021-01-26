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
  width: 100px;
  height: 100px;
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
  font-size: 12px;
  font-weight: bolder;
  text-shadow: 0px -1.5px 2px #000000, 0.5px 0.7px 2px #c3c3c3;
`;
export const IconEngrave = {
  filter:
    "drop-shadow(0px -1.5px 1px #000000) drop-shadow(0.5px 0.7px 1px #c3c3c3)",
};
function NoiseItem({ url, info }: NoiseItemProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const [isShowing, setIsShowing] = useState<boolean>();
  const audio = useRef<HTMLAudioElement>(null!);
  useEffect(() => {
    audio.current = new Audio(
      `https://api.soundcloud.com/tracks/${url}/stream?client_id=3c1222aaa64b9dc73bc257260a5497cb`
    );
    audio.current.addEventListener("ended", startNoise);
    return () => {
      audio.current.removeEventListener("ended", startNoise);
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
          <Icon size="30" style={IconEngrave} />
          <NoiseName>{name}</NoiseName>
          {isPlaying ? (
            <>
              <BsStopFill size="20" style={IconEngrave} />
            </>
          ) : (
            <BsFillPlayFill size="20" style={IconEngrave} />
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
