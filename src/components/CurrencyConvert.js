import React, { useState, useEffect } from 'react';
import CurrencyIn from './CurrencyIn';

function CurrencyConvert(props) {
  const [amount1, setamount1] = useState(1);
  const [currency1, setCurr1] = useState('EGP');
  const [amount2, setamount2] = useState(1);
  const [currency2, setCurr2] = useState('EGP');

  //to fetch the currencies from fixer.io currecncy API when the app loads
  useEffect(() => {}, []);

  return (
    <div className="container pt-5">
      <div className="row ">
        <div className="col-lg-4 col-md-4"></div>
        <div className="col-lg-4 col-md-4 curr-conv rounded-5 pt-3">
          <h4>Currency Converter</h4>
          <div className="row p-3">
            <CurrencyIn
              currencies={['EGP']}
              amount={amount1}
              currency={currency1}
            />
            <CurrencyIn
              currencies={['EGP']}
              amount={amount2}
              currency={currency2}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-4 "></div>
      </div>
    </div>
  );
}

export default CurrencyConvert;
