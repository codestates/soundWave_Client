import night from "../../images/night.png";
import "./nightEffect.css";

type NightEffectProps = {
  isNightPicked: boolean;
  setnightToggle: Function;
};

function NightEffect({ isNightPicked, setnightToggle }: NightEffectProps) {
  const changenightToggle = () => {
    if (!isNightPicked) {
      setnightToggle(false);
    }
  };

  return (
    <div
      className={`nightEffect ${isNightPicked ? "" : "nightEffectEnd"}`}
      onAnimationEnd={changenightToggle}
    >
      <img id="night" src={night} alt="night" />
    </div>
  );
}

export default NightEffect;
