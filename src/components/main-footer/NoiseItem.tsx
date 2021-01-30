import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IconType } from "react-icons";
import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import NoiseVolumeController from "./NoiseVolumeController";
import { SW_API_URL, SW_CLIENT_ID } from "../../const";
import { useDispatch, useSelector } from "react-redux";
import { turnOffNoise, turnOnNoise } from "../../reducer/footerReducer";
import { RootState } from "../../reducer";

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
type NoiseItemProps = {
  url: string;
  info: [string, IconType];
  name: string;
};
function NoiseItem({ url, info, name }: NoiseItemProps) {
  const dispatch = useDispatch();
  const isPlaying = useSelector(
    (state: RootState) => state.footer.noiseList[name].picked
  );
  const volume = useSelector(
    (state: RootState) => state.footer.noiseList[name].volume
  );
  const [isShowing, setIsShowing] = useState<boolean>();
  const audio = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    const { current } = audio;
    current.src = `${SW_API_URL}/tracks/${url}/stream?client_id=${SW_CLIENT_ID}`;
    current.loop = true;
  }, [url]);
  useEffect(() => {
    const { current } = audio;
    if (isPlaying) {
      current.currentTime = 30;
      current.play();
    } else {
      current.pause();
    }
  }, [isPlaying]);
  useEffect(() => {
    const { current } = audio;
    current.volume = volume / 100;
  }, [volume]);
  function toggleNoise() {
    if (isPlaying) {
      dispatch(turnOffNoise(name));
    } else {
      dispatch(turnOnNoise(name));
    }
  }
  function showNoiseVolumeController() {
    setIsShowing(true);
  }
  function hideNoiseVolumeController() {
    setIsShowing(false);
  }
  const [displayName, Icon] = info;
  return (
    <>
      <Container
        onMouseEnter={showNoiseVolumeController}
        onMouseLeave={hideNoiseVolumeController}
      >
        <ToggleButton onClick={toggleNoise}>
          <Icon size="30" style={IconEngrave} />
          <NoiseName>{displayName}</NoiseName>
          {isPlaying ? (
            <>
              <BsStopFill size="20" style={IconEngrave} />
            </>
          ) : (
            <BsFillPlayFill size="20" style={IconEngrave} />
          )}
        </ToggleButton>
        {isPlaying && isShowing && (
          <NoiseVolumeController audio={audio.current} name={name} />
        )}
      </Container>
    </>
  );
}

export default NoiseItem;
