import flame from "../../images/flame.png";
import "./fireEffect.css";

function FireEffect() {
  return (
    <div className="fireEffect">
      <img id="flameA" src={flame} />
      <img id="flameB" src={flame} />
      <img id="flameC" src={flame} />
      <img id="flameD" src={flame} />
    </div>
  );
}

export default FireEffect;
