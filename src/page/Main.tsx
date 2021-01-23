import Footer from "../components/main-footer/Footer";
import raintest from "../components/main-animation/rainEffect";
import streetLamp from "../components/main-animation/streetLamp";
import bounceCar from "../components/main-animation/bounceCar";
import mainRoad from "../components/main-animation/mainRoad";

function Main() {
  return (
    <>
      {raintest()}
      {mainRoad()}
      {/* {streetLamp()} */}
      {/* {bounceCar()}; */}
      <Footer />
    </>
  );
}

export default Main;
