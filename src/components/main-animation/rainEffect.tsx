import React from "react";
import "./rainEffect.css";

function rainEffect() {
  const drops: JSX.Element[] = [];
  const backDrops: JSX.Element[] = [];
  let increment: number = 0;
  let backIncrement: number = 0;

  while (increment < 100) {
    let randoHundo: number = Math.floor(Math.random() * (98 - 1 + 1) + 1);
    let randoFiver: number = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    let backrandom: number = Math.floor(Math.random() * (20 - 10 + 1) + 10);
    increment += randoFiver;
    backIncrement += backrandom;

    const dropStyle: object = {
      left: `${(increment % 100) - 1}%`,
      bottom: `${randoFiver + randoFiver - 1 + 100}%`,
      animationDelay: `0.${randoHundo}s`,
      animationDuration: `0.5${randoHundo}s`,
    };

    const stemAndSplat: object = {
      animationDelay: `0.${randoHundo}s`,
      animationDuration: `0.5${randoHundo}s`,
    };

    let dropRain: JSX.Element = (
      <div className="drop" style={dropStyle} key={increment}>
        <div className="stem" style={stemAndSplat} key={increment + 1}></div>
        {/* <div className="splat" style={stemAndSplat} key={increment + 2}></div> */}
      </div>
    );

    // let backDropsRain: JSX.Element = (
    //   <div
    //     className="drop"
    //     style={{ ...dropStyle, left: `${(backIncrement % 100) - 1}%` }}
    //     key={increment + 3}
    //   >
    //     <div className="stem" style={stemAndSplat} key={increment + 4}></div>
    //     <div className="stem" style={stemAndSplat} key={increment + 5}></div>
    //   </div>
    // );

    drops.push(dropRain);
    // backDrops.push(backDropsRain);
  }

  return (
    <div className="back-row-toggle splat-toggle">
      <div className="rain front-row">{drops}</div>
      <div className="rain back-row">{backDrops}</div>
    </div>
  );
}

export default rainEffect;
