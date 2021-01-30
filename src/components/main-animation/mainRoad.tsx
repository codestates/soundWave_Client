import StreetLamp from "./streetLamp";
import BounceCar from "./bounceCar";
import Raintest from "./rainEffect";
import WaveEffect from "./waveEffect";
import longRoadimage from "../../images/road_long.png";
import "./mainRoad.css";
import NightEffect from "./nightEffect";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer";
import { useEffect, useState } from "react";

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
  const isCampfirePicked = useSelector(
    (state: RootState) => state.footer.noiseList["campfire"].picked
  );

  const [waveToggle, setwaveToggle] = useState(false);

  useEffect(() => {
    if (isWavePicked) {
      setwaveToggle(true);
    }
  }, [isWavePicked]);

  return (
    <div className="mainRoad">
      {isNightPicked && <NightEffect />}
      <img
        id="road"
        className={isDrivePicked ? "roadMoving" : ""}
        src={longRoadimage}
        alt="road"
      />
      {isDrivePicked && <BounceCar />}
      <StreetLamp
        isDrivePicked={isDrivePicked}
        isCampfiePicked={isCampfirePicked}
      />
      {waveToggle && (
        <WaveEffect isWavePicked={isWavePicked} setwaveToggle={setwaveToggle} />
      )}
      {isRainPicked && <Raintest />}
    </div>
  );
}

export default MainRoad;
