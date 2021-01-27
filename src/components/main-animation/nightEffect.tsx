import React from "react";
import night from "../../images/night.png";
import "./nightEffect.css";

function nightEffect() {
  return (
    <div className="nightEffect">
      <img id="night" src={night} alt="" />
    </div>
  );
}

export default nightEffect;
