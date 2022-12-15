import React, { useEffect, useState } from 'react';
import axios from 'axios';
function CurrencyDisplay() {
  const [ratesList, setRatesList] = useState([]);
  const [baseCurr, setBaseCurr] = useState('EGP');
  const [date, setDate] = useState('');
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
    setRatesList(ratesArr);
    setDate(res.data.date);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-4 col-md-2"></div>
        <div className="col-lg-4  col-md-8  curr-display  ">
          <div className="input-group  ">
            <select
              className="form-select "
              aria-label="display all currencies"
              style={{
                'max-height': '200px',
                'overflow-y': 'scroll',
              }}
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
  );
}

export default CurrencyDisplay;
/* https://api.apilayer.com/exchangerates_data/latest?base=${base}&apikey=8yAnIRDjLmmjrwTjvwkMjURWC6eJTNkw*/
