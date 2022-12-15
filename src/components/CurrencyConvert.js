import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyIn from './CurrencyIn';

function CurrencyConvert(props) {
  const [amount1, setAmount1] = useState(1);
  const [currency1, setCurr1] = useState('USD');
  const [amount2, setAmount2] = useState(1);
  const [currency2, setCurr2] = useState('EGP');
  const [xRates, setXR] = useState([]);
  //to fetch the currencies from exchangerates.io currecncy API when the app loads
  useEffect(() => {
    axios
      .get(
        'https://api.apilayer.com/exchangerates_data/latest?base=EGP&apikey=8yAnIRDjLmmjrwTjvwkMjURWC6eJTNkw'
      )
      .then((res) => {
        setXR(res.data.rates);
      });
  }, []);
  /* to calculate the amount2 value wrt the base currency */
  useEffect(() => {
    !!xRates && amount1Handler(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xRates]);
  /* this function to format the amount number to a fixed-point notation */
  const amountFormat = (amount) => {
    return amount.toFixed(2);
  };
  /* handling change in amount1 input element to change amount2*/
  const amount1Handler = (amount1) => {
    setAmount2(amountFormat((amount1 * xRates[currency2]) / xRates[currency1]));
    setAmount1(amount1);
  };

  /* handling change in amount2 input element to change amount1*/
  const amount2Handler = (amount2) => {
    setAmount1(amountFormat((amount2 * xRates[currency1]) / xRates[currency2]));
    setAmount2(amount2);
  };

  /* handling change in currency1 select element to change amount2 */
  const currency1Handler = (currency1) => {
    setAmount2(amountFormat((amount1 * xRates[currency2]) / xRates[currency1]));
    setCurr1(currency1);
  };

  /* handling change in currency2 select element to change amount1 */
  const currency2Handler = (currency2) => {
    setAmount1(amountFormat((amount2 * xRates[currency1]) / xRates[currency2]));
    setCurr2(currency2);
  };
  return (
    <div className="container pt-2">
      <div className="row ">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 curr-conv rounded-5 pt-3">
          <h4>Currency Converter</h4>
          <div className="row p-3">
            <CurrencyIn
              currencies={Object.keys(xRates)}
              amount={amount1}
              currency={currency1}
              amountHandler={amount1Handler}
              currencyHandler={currency1Handler}
            />
            <CurrencyIn
              currencies={Object.keys(xRates)}
              amount={amount2}
              currency={currency2}
              amountHandler={amount2Handler}
              currencyHandler={currency2Handler}
            />
          </div>
        </div>
        <div className="col-lg-3 col-md-8 "></div>
      </div>
    </div>
  );
}

export default CurrencyConvert;
