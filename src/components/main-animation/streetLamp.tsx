import "./streetLamp.css";
import { useState, useEffect } from "react";
import streetLampImage from "../../images/street_lamp.png";
import lampLight from "../../images/lamp_light.png";
import FireEffect from "./fireEffect";

type StreetLampProps = {
  isDrivePicked: boolean;
  isCampfiePicked: boolean;
  lampMoveHandle: boolean;
};

function StreetLamp({ isCampfiePicked, lampMoveHandle }: StreetLampProps) {
  const [fireToggle, setfireToggle] = useState(false);

  useEffect(() => {
    if (isCampfiePicked) {
      setfireToggle(true);
    }
  }, [isCampfiePicked]);

  return (
    <div
      className={`lampAndLight ${lampMoveHandle ? "lampAndLightMoving" : ""}`}
    >
      <img id="streetLamp" src={streetLampImage} alt="streetLamp" />
      {fireToggle && (
        <FireEffect
          isCampfiePicked={isCampfiePicked}
          setfireToggle={setfireToggle}
        />
      )}
      <img
        className={`lampLight ${
          isCampfiePicked ? "blinkburning" : "blinkStart"
        }`}
        src={lampLight}
        alt="lampLight"
      />
    </div>
  );
}

export default StreetLamp;
