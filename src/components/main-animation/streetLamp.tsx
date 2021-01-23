import React from "react";
import "./streetLamp.css";
import streetLampImage from "../../images/street_lamp.png";
import lampLight from "../../images/lamp_light.png";

function streetLamp() {
  return (
    <div className="lampAndLight">
      <img id="streetLamp" src={streetLampImage}></img>
      <img id="lampLight" src={lampLight}></img>
    </div>
  );
}

export default streetLamp;
