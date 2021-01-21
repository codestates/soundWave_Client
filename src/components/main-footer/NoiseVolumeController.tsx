import { ChangeEvent, useState } from "react";
import styled from "styled-components";

type NoiseVolumeControllerProps = {
  audio: HTMLAudioElement;
};
const Container = styled.div`
  position: absolute;
  bottom: 5px;
`;
const VolumeInput = styled.input`
  appearance: none;
  opacity: 0.1;
  height: 10px;
  background: black;
  border-radius: 10px;
  outline: none;
  transition: opacity 0.5s;
  &:hover {
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    cursor: pointer;
    appearance: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    background: radial-gradient(
      circle at 50% 50%,
      white 1px,
      #e2e2e2 3%,
      #bebebe 60%,
      #242424 100%
    );
  }
`;
function NoiseVolumeController({ audio }: NoiseVolumeControllerProps) {
  const [volume, setVolume] = useState(audio.volume * 100);
  function setNoiseVolume(e: ChangeEvent<HTMLInputElement>) {
    const volume = parseInt(e.target.value);
    audio.volume = volume / 100;
    setVolume(volume);
  }

  return (
    <>
      <Container>
        <VolumeInput type="range" value={volume} onChange={setNoiseVolume} />
      </Container>
    </>
  );
}
export default NoiseVolumeController;
