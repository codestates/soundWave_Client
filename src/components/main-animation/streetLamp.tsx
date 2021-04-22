import "./streetLamp.css";
import { useState, useEffect, useRef } from "react";
import streetLampImage from "../../images/street_lamp.png";
import lampLight from "../../images/lamp_light.png";
import FireEffect from "./fireEffect";

type StreetLampProps = {
  isCampfiePicked: boolean;
  lampMoveHandle: boolean;
  lampState: string;
  setlampToggle: Function;
  setlampState: Function;
  setroadMoveHandle: Function;
};

function StreetLamp({
  isCampfiePicked,
  lampMoveHandle,
  setlampToggle,
  lampState,
  setlampState,
  setroadMoveHandle,
}: StreetLampProps) {
  const [fireToggle, setfireToggle] = useState(false);
  const [moveingToggle, setmoveingToggle] = useState(false);
  const [fireEndCheck, setfireEndCheck] = useState(false);
  const lampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCampfiePicked) {
      setfireToggle(true);
    }
  }, [isCampfiePicked]);

  useEffect(() => {
    if (lampMoveHandle) {
      setmoveingToggle(true);
    }
  }, [lampMoveHandle]);

  const isStart = () => {
    if (!moveingToggle) {
      return "blinkStart";
    }

    return "";
  };

  const startFrom = () => {
    if (moveingToggle && lampState === "middle") {
      return "moveingToRight";
    }

    if (moveingToggle && lampState === "moveing") {
      return "moveingFromLeftToRight";
    }

    if (lampState === "end") {
      return "moveingToMiddle";
    }

    return "";
  };

  const handleingLampMove = () => {
    if (fireEndCheck) {
      return;
    }

    if (lampMoveHandle) {
      if (lampRef.current?.classList.contains("moveingToRight")) {
        setlampState("moveing");
        setlampToggle(false);
        return;
      }

      if (lampRef.current?.classList.contains("moveingFromLeftToRight")) {
        setlampToggle(false);
        return;
      }
    }

    if (!lampMoveHandle) {
      if (lampRef.current?.classList.contains("moveingToRight")) {
        setlampState("moveing");
        setlampToggle(false);
        return;
      }

      if (lampRef.current?.classList.contains("moveingFromLeftToRight")) {
        setlampState("end");
        setlampToggle(false);
        return;
      }

      if (lampRef.current?.classList.contains("moveingToMiddle")) {
        setlampState("middle");
        setroadMoveHandle(false);
        setmoveingToggle(false);
        return;
      }
    }
  };

  return (
    <div
      className={`lampAndLight ${startFrom()}`}
      ref={lampRef}
      onAnimationEnd={handleingLampMove}
    >
      <img id="streetLamp" src={streetLampImage} alt="streetLamp" />
      {fireToggle && (
        <FireEffect
          isCampfiePicked={isCampfiePicked}
          setfireToggle={setfireToggle}
          setfireEndCheck={setfireEndCheck}
        />
      )}
      <img
        className={`lampLight ${isCampfiePicked ? "blinkburning" : isStart()}`}
        src={lampLight}
        alt="lampLight"
      />
    </div>
  );
}

export default StreetLamp;
