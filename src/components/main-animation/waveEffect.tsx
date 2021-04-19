import waveFirst from "../../images/wave_first.png";
import waveMiddle from "../../images/wave_middle.png";
import waveLast from "../../images/wave_last.png";
import "./waveEffect.css";
import { useRef } from "react";

type WaveEffectProps = {
  isWavePicked: boolean;
  setwaveToggle: Function;
};

function WaveEffect({ isWavePicked, setwaveToggle }: WaveEffectProps) {
  const ref = useRef<HTMLDivElement>(null);

  const checkEffectEnd = () => {
    if (ref.current?.classList.contains("waveEffectEnd")) {
      setwaveToggle(false);
    }
  };

  return (
    <div
      className={isWavePicked ? "" : "waveEffectEnd"}
      ref={ref}
      onAnimationEnd={checkEffectEnd}
    >
      <div className="waveEffect">
        <img id="waveLast" src={waveLast} alt="waveLast" />
        <img id="waveMiddle" src={waveMiddle} alt="waveMiddle" />
        <img id="waveFirst" src={waveFirst} alt="waveFirst" />
      </div>
    </div>
  );
}

export default WaveEffect;
