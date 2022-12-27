import AnimatedBg from './components/AnimatedBg';
import CurrencyDisplay from './components/CurrencyDisplay';
/*import TryThis from './components/TryThis';
import Timer from './components/Timer';*/
function App() {
  return (
    <div className=" text-light text-center ">
      <AnimatedBg />
      <div className=" app-body">
        <h1 className="mt-5 py-3 ">
          Realtime Currency-XR <br /> Converter Application
        </h1>
        <CurrencyDisplay />

        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-5"></div>
            <div className="col-lg-2 social">
              <a href="https://www.linkedin.com/in/manar-eldredy-909/">
                <i class="bi bi-linkedin text-primary"></i>
              </a>
              <a href="https://github.com/manaressam9/currency-xr">
                {' '}
                <i class="bi bi-github text-dark"></i>
              </a>
            </div>
            <div className="col-lg-5"></div>
            <small className="mt-3 ">
              2022 <i class="bi bi-c-circle text-light"></i> Currency-XR
              Converter
            </small>
          </div>
        </div>
      </div>
      {/*  <TryThis />*/}
    </div>
  );
}

export default App;
