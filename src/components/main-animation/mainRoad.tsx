import streetLamp from "./streetLamp";
import bounceCar from "./bounceCar";
import "./mainRoad.css";
import longRoadimage from "../../images/road_long.png";

function mainRoad() {
  return (
    <div className="mainRoad">
      {streetLamp()}
      {bounceCar()}
      <img id="road" src={longRoadimage} alt="" />
    </div>
  );
}

export default mainRoad;
