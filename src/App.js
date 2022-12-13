import coin from './coin.svg';
function App() {
  return (
    <div className="grad-bg text-white ">
      <div className="container mt-5 pt-5 text-white text-center">
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
    </div>
  );
}

export default App;
