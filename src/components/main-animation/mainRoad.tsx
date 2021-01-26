import streetLamp from "./streetLamp";
import bounceCar from "./bounceCar";
import raintest from "./rainEffect";
import "./mainRoad.css";
import longRoadimage from "../../images/road_long.png";

function mainRoad() {
  return (
    <div className="mainRoad">
      <img id="road" src={longRoadimage} alt="" />
      {bounceCar()}
      {streetLamp()}
      {raintest()}
    </div>
  );
}

export default mainRoad;
