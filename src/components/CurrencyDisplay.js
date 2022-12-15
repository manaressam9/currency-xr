import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrencyConvert from './CurrencyConvert';
import FavCurr from './FavCurr';
function CurrencyDisplay() {
  /*Curr Display vars */
  const [ratesList, setRatesList] = useState([]);
  const [baseCurr, setBaseCurr] = useState('EGP');
  const [date, setDate] = useState('');
  /*Curr Convert vars */
  const [amount1, setAmount1] = useState(1);
  const [currency1, setCurr1] = useState('USD');
  const [amount2, setAmount2] = useState(1);
  const [currency2, setCurr2] = useState('EGP');
  const [xRates, setXR] = useState([]);
  /*Fav Curr vars*/
  useEffect(() => {
    displayCurrencies('EGP');
  }, []);

  const displayCurrencies = async (base) => {
    const res = await axios.get(
      ` https://api.apilayer.com/exchangerates_data/latest?base=${base}&apikey=8yAnIRDjLmmjrwTjvwkMjURWC6eJTNkw`
    );
    const { rates } = res.data;

    const ratesArr = [];
    for (const [symbol, rate] of Object.entries(rates)) {
      ratesArr.push({ symbol, rate });
    }
    setXR(res.data.rates);
    setRatesList(ratesArr);
    setDate(res.data.date);
  };
  /* Currency Converter Logic */
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
    <>
      {/* Display available currencies and their XRates */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-4 col-md-2"></div>
          <div className="col-lg-4  col-md-8  curr-display  ">
            <div className="input-group  ">
              <select
                className="form-select "
                aria-label="display all currencies"
                value={baseCurr}
                onChange={(event) => {
                  const value = event.target.value;
                  setBaseCurr(value);
                  displayCurrencies(value);
                }}
              >
                {ratesList.map((curr) => (
                  <option key={curr.symbol} value={curr.symbol}>
                    {curr.symbol}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn  dropdown-toggle "
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-currency-exchange text-warning "></i>
                Exchange Rates
              </button>
              <ul className="dropdown-menu">
                {ratesList.map((curr) => (
                  <li key={curr.symbol}>
                    <button className="dropdown-item">
                      {curr.symbol} - {curr.rate}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <p>
              <small>Last Updated: {date} </small>
            </p>
          </div>
          <div className="col-lg-4 col-md-2"> </div>
        </div>
      </div>
      {/* Currency Converter */}
      <div className="container pt-2">
        <div className="row ">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 curr-conv rounded-5 pt-3">
            <h4>Currency Converter</h4>
            <div className="row p-3">
              <CurrencyConvert
                currencies={Object.keys(xRates)}
                amount={amount1}
                currency={currency1}
                amountHandler={amount1Handler}
                currencyHandler={currency1Handler}
              />
              <CurrencyConvert
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
      {/* Favourite Curr list*/}
      <FavCurr favCurr={ratesList} />
    </>
  );
}

export default CurrencyDisplay;
/* https://api.apilayer.com/exchangerates_data/latest?base=${base}&apikey=8yAnIRDjLmmjrwTjvwkMjURWC6eJTNkw*/
