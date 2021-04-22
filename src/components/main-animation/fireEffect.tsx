import flame from "../../images/flame.png";
import "./fireEffect.css";

type FireEffectProps = {
  isCampfiePicked: boolean;
  setfireToggle: Function;
  setfireEndCheck: Function;
};

function FireEffect({
  isCampfiePicked,
  setfireToggle,
  setfireEndCheck,
}: FireEffectProps) {
  const changeEndState = () => {
    setfireEndCheck(true);
    return "fireEffectEnd";
  };

  const changefireToggle = () => {
    if (!isCampfiePicked) {
      setfireEndCheck(false);
      setfireToggle(false);
    }
  };

  return (
    <div
      className={`fireEffect ${isCampfiePicked ? "" : changeEndState()} `}
      onAnimationEnd={changefireToggle}
    >
      <img id="flameA" src={flame} alt="flameA" />
      <img id="flameB" src={flame} alt="flameB" />
      <img id="flameC" src={flame} alt="flameC" />
      <img id="flameD" src={flame} alt="flameD" />
    </div>
  );
}

export default FireEffect;
