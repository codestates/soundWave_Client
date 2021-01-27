import streetLamp from "./streetLamp";
import bounceCar from "./bounceCar";
import raintest from "./rainEffect";
import waveEffect from "./waveEffect";
import nightEffect from "./nightEffect";
import longRoadimage from "../../images/road_long.png";
import "./mainRoad.css";

function mainRoad() {
  return (
    <div className="mainRoad">
      {nightEffect()}
      <img id="road" src={longRoadimage} alt="" />
      {bounceCar()}
      {streetLamp()}
      {waveEffect()}
      {raintest()}
    </div>
  );
}

export default mainRoad;
