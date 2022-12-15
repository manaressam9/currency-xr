import React from 'react';
import coin from '../coin.svg';
function AnimatedBg() {
  return (
    <>
      <div className="grad-bg ">
        <div className="animated-coins">
          <img src={coin} alt="coin" />
        </div>
        <div className="animated-coins">
          <img src={coin} alt="coin" />
        </div>
        <div className="animated-coins">
          <img src={coin} alt="coin" />
        </div>
        <div className="animated-coins">
          <img src={coin} alt="coin" />
        </div>
        <div className="animated-coins">
          <img src={coin} alt="coin" />
        </div>
      </div>
    </>
  );
}

export default AnimatedBg;
