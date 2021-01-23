import React from "react";
import "./bounceCar.css";
import carFrameImage from "../../images/car_frame.png";
import carWheelImage from "../../images/car_wheel.png";

function bounceCar() {
  return (
    <div className="bounceCar">
      <img id="carFrame" src={carFrameImage}></img>
      <img id="carWheel" src={carWheelImage}></img>
    </div>
  );
}

export default bounceCar;
