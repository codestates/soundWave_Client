import "./streetLamp.css";
import streetLampImage from "../../images/street_lamp.png";
import lampLight from "../../images/lamp_light.png";
import FireEffect from "./fireEffect";
type StreetLampProps = {
  isDrivePicked: boolean;
  isCampfiePicked: boolean;
};
function StreetLamp({ isDrivePicked, isCampfiePicked }: StreetLampProps) {
  return (
    <div
      className={`lampAndLight ${isDrivePicked ? "lampAndLightMoving" : ""}`}
    >
      <img id="streetLamp" src={streetLampImage} alt="" />
      {isCampfiePicked ? <FireEffect /> : <></>}
      <img
        className={`lampLight ${
          isCampfiePicked ? "blinkburning" : "blinkStart"
        }`}
        src={lampLight}
        alt=""
      />
    </div>
  );
}

export default StreetLamp;
