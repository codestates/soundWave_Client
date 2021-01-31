import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../reducer";
import { setVolume } from "../../reducer/footerReducer";
const Container = styled.div`
  position: absolute;
  bottom: 0px;
`;
const VolumeInput = styled.input`
  appearance: none;
  opacity: 0.5;
  height: 5px;
  width: 80px;
  background: black;
  border-radius: 20px;
  outline: none;
  transition: opacity 0.5s;
  &:hover {
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    cursor: pointer;
    appearance: none;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background: radial-gradient(
      circle at 50% 50%,
      white 1px,
      #e2e2e2 3%,
      #bebebe 60%,
      #242424 100%
    );
  }
`;
type NoiseVolumeControllerProps = {
  audio: HTMLAudioElement;
  name: string;
};
function NoiseVolumeController({ audio, name }: NoiseVolumeControllerProps) {
  const dispatch = useDispatch();
  const volume = useSelector(
    (state: RootState) => state.footer.noiseList[name].volume
  );
  function setNoiseVolume(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setVolume({ name, volume: parseInt(e.target.value) }));
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
