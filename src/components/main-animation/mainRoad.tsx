import StreetLamp from "./streetLamp";
import BounceCar from "./bounceCar";
import Raintest from "./rainEffect";
import WaveEffect from "./waveEffect";
import longRoadimage from "../../images/road_long.png";
import "./mainRoad.css";
import NightEffect from "./nightEffect";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer";

function MainRoad() {
  const isRainPicked = useSelector(
    (state: RootState) => state.footer.noiseList["rain"].picked
  );
  const isDrivePicked = useSelector(
    (state: RootState) => state.footer.noiseList["drive"].picked
  );
  const isNightPicked = useSelector(
    (state: RootState) => state.footer.noiseList["night"].picked
  );
  const isWavePicked = useSelector(
    (state: RootState) => state.footer.noiseList["wave"].picked
  );
  const isCampfiePicked = useSelector(
    (state: RootState) => state.footer.noiseList["campfire"].picked
  );
  return (
    <div className="mainRoad">
      {isNightPicked && <NightEffect />}
      <img
        id="road"
        className={isDrivePicked ? "roadMoving" : ""}
        src={longRoadimage}
        alt=""
      />
      {isDrivePicked && <BounceCar />}
      <StreetLamp
        isDrivePicked={isDrivePicked}
        isCampfiePicked={isCampfiePicked}
      />
      {isWavePicked && <WaveEffect />}
      {isRainPicked && <Raintest />}
    </div>
  );
}

export default MainRoad;
