import React from 'react';

function CurrencyIn(props) {
  return (
    <>
      <div className="col-lg-8 col-md-6 mb-1  ">
        <input
          className="form-control rounded-pill"
          type="text"
          aria-label="amount of money"
          value={props.amount}
          onChange={(event) => props.amountHandler(event.target.value)}
        ></input>
      </div>
      <div className="col-lg-4 col-md-6 mb-3 ">
        <select
          className="form-select rounded-pill"
          aria-label="select currency"
          value={props.currency}
          onChange={(event) => props.currencyHandler(event.target.value)}
        >
          {' '}
          {props.currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default CurrencyIn;
