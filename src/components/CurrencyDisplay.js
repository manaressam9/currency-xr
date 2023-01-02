import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CurrencyConvert from './CurrencyConvert';
import { Rates, oldRates, oldUpdate, oldPct, Symbols } from '../Rates';
//import FavCurr from './FavCurr';
function CurrencyDisplay() {
  /*Curr Display vars */
  const [ratesList, setRatesList] = useState(Rates);
  const [oldRatesList, setOldRatesList] = useState(oldRates);
  const [pctChange, setPctChange] = useState(oldPct);
  const [updatedData, setUpdatedData] = useState(oldUpdate);
  const [baseCurr, setBaseCurr] = useState('EGP');
  const [symbols, setSymbols] = useState(Symbols);
  const [date, setDate] = useState('');
  const [timer, setTimer] = useState(5);
  /*Fav List vars */
  const [row1, setRow1] = useState(124);
  const [row2, setRow2] = useState(46);
  const [row3, setRow3] = useState(0);
  const [row4, setRow4] = useState(150);
  const [row5, setRow5] = useState(73);
  /*Curr Convert vars */
  const [amount1, setAmount1] = useState(1);
  const [currency1, setCurr1] = useState('USD');
  const [amount2, setAmount2] = useState(1);
  const [currency2, setCurr2] = useState('EGP');
  const [xRates, setXR] = useState([]);

  /*fetch data from api based on baseCurr value */
  const displayCurrencies = useCallback(async () => {
    const res = await axios.get(
      `https://api.apilayer.com/fixer/latest?base=${baseCurr}&apikey=BW7DTrt6awxgkEfOwt49R2rgXNUALOKG`
    );
    const { rates } = res.data;

    const ratesArr = [];
    for (const [symbol, rate] of Object.entries(rates)) {
      ratesArr.push({ symbol, rate });
    }
    setXR(res.data.rates);
    setRatesList(ratesArr);
    //setOldRatesList(ratesArr);
    setDate(res.data.date);
  }, [baseCurr]);

  /*fetch data from symbols endpoint
  const displaySymbols = useCallback(async () => {
    const res = await axios.get(
      `https://api.apilayer.com/fixer/symbols?&apikey=BW7DTrt6awxgkEfOwt49R2rgXNUALOKG`
    );

    setSymbols(res.data.symbols);
  }, []); */

  /*renders once at the startup*/
  useEffect(() => {
    displayCurrencies();
    // displaySymbols();
    console.log('1st api call effect');
  }, [displayCurrencies]);

  /*renders every 5secs with the updated ratesList */
  useEffect(() => {
    console.log(' 2nd interval effect');
    const interval = setInterval(() => {
      const UpdatedR1 = ratesList.map((obj) => {
        if (obj.rate === 1 && obj.symbol === baseCurr) {
          return { symbol: obj.symbol, rate: obj.rate };
        } else {
          return {
            symbol: obj.symbol,
            rate: obj.rate + Math.random() * (0.05 - -0.02) + -0.02,
          };
        }
      });
      setOldRatesList(ratesList);
      setRatesList(UpdatedR1);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [ratesList, baseCurr]);

  /* pctchange useEffect dependant on oldrateslist and rateslist */
  useEffect(() => {
    const changePct = ratesList.map((obj, index) => {
      return {
        s: obj.symbol,
        c: amountFormat(
          ((obj.rate - oldRatesList[index].rate) /
            Math.abs(oldRatesList[index].rate)) *
            100
        ),
      };
    });
    setPctChange(changePct);
  }, [ratesList, oldRatesList]);

  /* updateddata useEffect dependant on pctchange */
  useEffect(() => {
    const updatedD = pctChange.map((obj, index) => {
      return {
        symbol: ratesList[index].symbol,
        rate: ratesList[index].rate,
        change: obj.c,
      };
    });
    setUpdatedData(updatedD);
  }, [ratesList, pctChange]);

  /*renders every sec to display a 5sec timer */
  useEffect(() => {
    console.log('3rd timer call effect');

    if (ratesList.length === 0) {
      console.log(ratesList);
    } else {
      const interval = setInterval(() => {
        timer === 1 ? setTimer(5) : setTimer(timer - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [timer, ratesList]);

  /* Currency Converter Logic */
  /* to calculate the amount2 value wrt the base currency */
  useEffect(() => {
    !!xRates && amount1Handler(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xRates]);
  /* this function to format the amount number to a fixed-point notation */
  const amountFormat = (amount) => {
    return amount.toFixed(4);
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
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-4 col-md-2"></div>
          <div className="col-lg-4  col-md-8  curr-display  ">
            <h6>
              {' '}
              <i className="bi bi-1-circle-fill text-warning"></i> Available
              Currencies{' '}
            </h6>
            <div className="input-group  ">
              <select
                className="form-select "
                aria-label="display all currencies"
                value={baseCurr}
                onChange={(event) => {
                  const value = event.target.value;
                  setBaseCurr(value);
                  displayCurrencies();
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

            <p className="pt-2">
              {' '}
              Last Update : {date} In{' '}
              <span className="badge bg-light text-dark rounded-circle">
                {timer}
              </span>
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
      {/* Favourite Curr list
      <FavCurr favCurr={ratesList} />*/}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <h5>
            <i className="bi bi-star-fill text-warning"></i> Favourite Currency
            List
          </h5>
          <div className="col-12">
            <div
              className="table-responsive table-scroll rounded-3 bg-light shadow-2-strong"
              data-mdb-perfect-scrollbar="true"
              style={{ position: 'relative', height: '320px' }}
            >
              <table className="table table-borderless rounded-3 mb-0">
                <thead>
                  <tr>
                    <th scope="col">Currency</th>
                    <th scope="col">Value</th>
                    <th scope="col">Change(5s)</th>
                    <th scope="col">Edit Currency</th>
                  </tr>
                </thead>
                <tbody>
                  {/*1st row */}
                  <tr key={updatedData[row1].symbol}>
                    <th scope="row">
                      {updatedData[row1].symbol} - {symbols[row1].value}
                    </th>
                    <td>{updatedData[row1].rate}</td>
                    <td
                      className={
                        updatedData[row1].change > 0
                          ? 'text-success'
                          : updatedData[row1].change < 0
                          ? 'text-danger'
                          : 'text-dark'
                      }
                    >
                      <i
                        className={
                          updatedData[row1].change > 0
                            ? 'bi bi-arrow-up-short text-success'
                            : updatedData[row1].change < 0
                            ? 'bi bi-arrow-down-short text-danger'
                            : 'text-dark'
                        }
                      ></i>{' '}
                      {updatedData[row1].change} %{' '}
                    </td>
                    <td>
                      <select
                        className="form-select "
                        aria-label="display all currencies"
                        // value={baseCurr}
                        onChange={(event) => {
                          const value = event.target.value;
                          const x = oldRatesList.findIndex(
                            (obj) => obj.symbol === value
                          );
                          setRow1(x);
                        }}
                      >
                        <option value="change">change</option>
                        {ratesList.map((curr, index) => (
                          <option key={curr.symbol} value={curr.symbol}>
                            {curr.symbol}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {/*2nd row */}
                  <tr key={updatedData[row2].symbol}>
                    <th scope="row">
                      {updatedData[row2].symbol} - {symbols[row2].value}
                    </th>
                    <td>{updatedData[row2].rate}</td>
                    <td
                      className={
                        updatedData[row2].change > 0
                          ? 'text-success'
                          : updatedData[row2].change < 0
                          ? 'text-danger'
                          : 'text-dark'
                      }
                    >
                      <i
                        className={
                          updatedData[row2].change > 0
                            ? 'bi bi-arrow-up-short text-success'
                            : updatedData[row2].change < 0
                            ? 'bi bi-arrow-down-short text-danger'
                            : 'text-dark'
                        }
                      ></i>{' '}
                      {updatedData[row2].change} %{' '}
                    </td>
                    <td>
                      <select
                        className="form-select "
                        aria-label="display all currencies"
                        //value={baseCurr}
                        onChange={(event) => {
                          const value = event.target.value;
                          const x = oldRatesList.findIndex(
                            (obj) => obj.symbol === value
                          );
                          setRow2(x);
                        }}
                      >
                        <option value="change">change</option>
                        {ratesList.map((curr, index) => (
                          <option key={curr.symbol} value={curr.symbol}>
                            {curr.symbol}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {/*3rd row */}
                  <tr key={updatedData[row3].symbol}>
                    <th scope="row">
                      {updatedData[row3].symbol} - {symbols[row3].value}
                    </th>
                    <td>{updatedData[row3].rate}</td>
                    <td
                      className={
                        updatedData[row3].change > 0
                          ? 'text-success'
                          : updatedData[row3].change < 0
                          ? 'text-danger'
                          : 'text-dark'
                      }
                    >
                      <i
                        className={
                          updatedData[row3].change > 0
                            ? 'bi bi-arrow-up-short text-success'
                            : updatedData[row3].change < 0
                            ? 'bi bi-arrow-down-short text-danger'
                            : 'text-dark'
                        }
                      ></i>{' '}
                      {updatedData[row3].change} %{' '}
                    </td>
                    <td>
                      <select
                        className="form-select "
                        aria-label="display all currencies"
                        // value="change"
                        onChange={(event) => {
                          const value = event.target.value;
                          const x = oldRatesList.findIndex(
                            (obj) => obj.symbol === value
                          );
                          setRow3(x);
                        }}
                      >
                        <option value="change">change</option>
                        {ratesList.map((curr, index) => (
                          <option key={curr.symbol} value={curr.symbol}>
                            {curr.symbol}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {/*4th row */}
                  <tr key={updatedData[row4].symbol}>
                    <th scope="row">
                      {updatedData[row4].symbol} - {symbols[row4].value}
                    </th>
                    <td>{updatedData[row4].rate}</td>
                    <td
                      className={
                        updatedData[row4].change > 0
                          ? 'text-success'
                          : updatedData[row4].change < 0
                          ? 'text-danger'
                          : 'text-dark'
                      }
                    >
                      <i
                        className={
                          updatedData[row4].change > 0
                            ? 'bi bi-arrow-up-short text-success'
                            : updatedData[row4].change < 0
                            ? 'bi bi-arrow-down-short text-danger'
                            : 'text-dark'
                        }
                      ></i>{' '}
                      {updatedData[row4].change} %{' '}
                    </td>
                    <td>
                      <select
                        className="form-select "
                        aria-label="display all currencies"
                        // value="change"
                        onChange={(event) => {
                          const value = event.target.value;
                          const x = oldRatesList.findIndex(
                            (obj) => obj.symbol === value
                          );
                          setRow4(x);
                        }}
                      >
                        <option value="change">change</option>
                        {ratesList.map((curr, index) => (
                          <option key={curr.symbol} value={curr.symbol}>
                            {curr.symbol}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {/*5th row */}
                  <tr key={updatedData[row5].symbol}>
                    <th scope="row">
                      {updatedData[row5].symbol} - {symbols[row5].value}
                    </th>
                    <td>{updatedData[row5].rate}</td>
                    <td
                      className={
                        updatedData[row5].change > 0
                          ? 'text-success'
                          : updatedData[row5].change < 0
                          ? 'text-danger'
                          : 'text-dark'
                      }
                    >
                      <i
                        className={
                          updatedData[row5].change > 0
                            ? 'bi bi-arrow-up-short text-success'
                            : updatedData[row5].change < 0
                            ? 'bi bi-arrow-down-short text-danger'
                            : 'text-dark'
                        }
                      ></i>{' '}
                      {updatedData[row5].change} %{' '}
                    </td>
                    <td>
                      <select
                        className="form-select "
                        aria-label="display all currencies"
                        // value="change"
                        onChange={(event) => {
                          const value = event.target.value;
                          const x = oldRatesList.findIndex(
                            (obj) => obj.symbol === value
                          );
                          setRow5(x);
                        }}
                      >
                        <option value="change">change</option>
                        {ratesList.map((curr, index) => (
                          <option key={curr.symbol} value={curr.symbol}>
                            {curr.symbol}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrencyDisplay;
/* https://api.apilayer.com/exchangerates_data/latest?base=${base}&apikey=8yAnIRDjLmmjrwTjvwkMjURWC6eJTNkw*/
