import React from 'react';
import coin from '../coin.svg';
function Body() {
  return (
    <>
      <div className="container mt-5 pt-5 ">
        <h1>
          {' '}
          Realtime Currency-XR <br /> Converter Application
        </h1>
      </div>
      <div>
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

export default Body;
