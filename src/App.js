import AnimatedBg from './components/AnimatedBg';
import CurrencyDisplay from './components/CurrencyDisplay';
function App() {
  return (
    <div className=" text-white text-center ">
      <AnimatedBg />
      <div className=" app-body">
        <h1 className="mt-5 pt-5 ">
          Realtime Currency-XR <br /> Converter Application
        </h1>
        <CurrencyDisplay />
      </div>
    </div>
  );
}

export default App;
