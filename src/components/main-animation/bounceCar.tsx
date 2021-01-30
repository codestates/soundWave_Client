import "./bounceCar.css";
import carFrameImage from "../../images/car_frame.png";
import carWheelImage from "../../images/car_wheel.png";

function BounceCar() {
  return (
    <div className="bounceCar">
      <img id="carFrame" src={carFrameImage} alt="carFrame" />
      <img id="carWheel" src={carWheelImage} alt="carWheel" />
    </div>
  );
}

export default BounceCar;
