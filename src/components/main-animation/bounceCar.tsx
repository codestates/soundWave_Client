import "./bounceCar.css";
import carFrameImage from "../../images/car_frame.png";
import carWheelImage from "../../images/car_wheel.png";
import { useState } from "react";

type BounceCarProps = {
  isDrivePicked: boolean;
  setcarToggle: Function;
  setroadMoveHandle: Function;
  setlampMoveHandle: Function;
};

function BounceCar({
  isDrivePicked,
  setcarToggle,
  setroadMoveHandle,
  setlampMoveHandle,
}: BounceCarProps) {
  const [isCarMiddle, setisCarMiddle] = useState(false);

  const afterCarEventHandle = () => {
    setisCarMiddle(true);

    if (isDrivePicked) {
      setroadMoveHandle(true);
      setlampMoveHandle(true);
    }

    if (!isDrivePicked && isCarMiddle) {
      setlampMoveHandle(false);
      setcarToggle(false);
    }
  };

  const carStateHandle = () => {
    if (!isDrivePicked && isCarMiddle) {
      return "carMovingEnd";
    }
  };

  return (
    <div
      className={`bounceCar ${carStateHandle()}`}
      onAnimationEnd={afterCarEventHandle}
    >
      <img id="carFrame" src={carFrameImage} alt="carFrame" />
      <img id="carWheel" src={carWheelImage} alt="carWheel" />
    </div>
  );
}

export default BounceCar;
