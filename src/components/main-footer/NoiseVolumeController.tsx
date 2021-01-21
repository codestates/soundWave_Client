import { ChangeEvent, useState } from "react";
import styled from "styled-components";

type NoiseVolumeControllerProps = {
  audio: HTMLAudioElement;
};
const Container = styled.div`
  position: absolute;
  bottom: 0;
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
        <input type="range" value={volume} onChange={setNoiseVolume} />
      </Container>
    </>
  );
}
export default NoiseVolumeController;
