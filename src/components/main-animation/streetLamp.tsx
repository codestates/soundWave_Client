import "./streetLamp.css";
import streetLampImage from "../../images/street_lamp.png";
import lampLight from "../../images/lamp_light.png";
type StreetLampProps = {
  isDrivePicked: boolean;
};
function StreetLamp({ isDrivePicked }: StreetLampProps) {
  return (
    <div
      className={`lampAndLight ${isDrivePicked ? "lampAndLightMoving" : ""}`}
    >
      <img id="streetLamp" src={streetLampImage} alt="" />
      <img id="lampLight" src={lampLight} alt="" />
    </div>
  );
}

export default StreetLamp;
