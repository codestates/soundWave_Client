import waveFirst from "../../images/wave_first.png";
import waveMiddle from "../../images/wave_middle.png";
import waveLast from "../../images/wave_last.png";
import "./waveEffect.css";

type WaveEffectProps = {
  isWavePicked: boolean;
  setwaveToggle: Function;
};

function WaveEffect({ isWavePicked, setwaveToggle }: WaveEffectProps) {
  return (
    <div
      className={`waveEffect ${isWavePicked ? "" : "waveEffectEnd"}`}
      onAnimationEnd={() => setwaveToggle(false)}
    >
      <img id="waveLast" src={waveLast} alt="waveLast" />
      <img id="waveMiddle" src={waveMiddle} alt="waveMiddle" />
      <img id="waveFirst" src={waveFirst} alt="waveFirst" />
    </div>
  );
}

export default WaveEffect;
