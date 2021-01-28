import waveFirst from "../../images/wave_first.png";
import waveMiddle from "../../images/wave_middle.png";
import waveLast from "../../images/wave_last.png";
import "./waveEffect.css";

function WaveEffect() {
  return (
    <div className="waveEffect">
      <img id="waveLast" src={waveLast} alt="" />
      <img id="waveMiddle" src={waveMiddle} alt="" />
      <img id="waveFirst" src={waveFirst} alt="" />
    </div>
  );
}

export default WaveEffect;
