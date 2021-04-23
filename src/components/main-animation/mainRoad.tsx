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
  const [nightToggle, setnightToggle] = useState(false);
  const [carToggle, setcarToggle] = useState(false);
  const [roadMoveHandle, setroadMoveHandle] = useState(false);
  const [lampMoveHandle, setlampMoveHandle] = useState(false);
  const [lampToggle, setlampToggle] = useState(true);
  const [roadEndPoint, setroadEndPoint] = useState(false);
  const [lampState, setlampState] = useState("middle");

  useEffect(() => {
    if (isWavePicked) {
      setwaveToggle(true);
    }
  }, [isWavePicked]);

  useEffect(() => {
    if (isNightPicked) {
      setnightToggle(true);
    }
  }, [isNightPicked]);

  useEffect(() => {
    if (isDrivePicked) {
      setcarToggle(true);
    }
  }, [isDrivePicked]);

  useEffect(() => {
    if (lampState !== "middle") {
      setlampToggle(true);
    }
  }, [lampToggle]);

  const checkRoadEndPoint = () => {
    if (roadEndPoint) {
      return "roadMovingEnd";
    } else {
      return "roadMoving";
    }
  };

  return (
    <div className="mainRoad">
      {nightToggle && (
        <NightEffect
          isNightPicked={isNightPicked}
          setnightToggle={setnightToggle}
        />
      )}
      <img
        id="road"
        className={roadMoveHandle ? checkRoadEndPoint() : ""}
        src={longRoadimage}
        alt="road"
      />
      {carToggle && (
        <BounceCar
          isDrivePicked={isDrivePicked}
          setcarToggle={setcarToggle}
          setroadMoveHandle={setroadMoveHandle}
          setlampMoveHandle={setlampMoveHandle}
        />
      )}
      {lampToggle && (
        <StreetLamp
          isCampfiePicked={isCampfirePicked}
          lampMoveHandle={lampMoveHandle}
          lampState={lampState}
          roadEndPoint={roadEndPoint}
          setroadEndPoint={setroadEndPoint}
          setlampState={setlampState}
          setlampToggle={setlampToggle}
          setroadMoveHandle={setroadMoveHandle}
        />
      )}
      {waveToggle && (
        <WaveEffect isWavePicked={isWavePicked} setwaveToggle={setwaveToggle} />
      )}
      {isRainPicked && <Raintest />}
    </div>
  );
}

export default MainRoad;
