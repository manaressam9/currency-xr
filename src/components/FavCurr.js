import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
function FavCurr() {
  // Sample options for dropdown

  const [favCurr, setFavCurr] = useState([]);
  useEffect(() => {
    displayCurrencies();
  }, []);

  const displayCurrencies = async () => {
    const res = await axios.get(
      'https://api.apilayer.com/exchangerates_data/latest?base=EGP&apikey=8yAnIRDjLmmjrwTjvwkMjURWC6eJTNkw'
    );
    const { rates } = res.data;

    const ratesArr = [];
    for (const [symbol, rate] of Object.entries(rates)) {
      ratesArr.push({ symbol, rate });
    }
    setFavCurr(ratesArr);
  };
  // console.log({ favCurr });
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          {' '}
          <h5>
            <i className="bi bi-star-fill text-warning"></i> Favourite Currency
            List
          </h5>
          <Autocomplete
            options={favCurr.map((curr) => curr.symbol)}
            multiple
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Your Favourites"
              />
            )}
          />
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
}

export default FavCurr;
/*https://api.apilayer.com/exchangerates_data/latest?base=EGP&apikey=8yAnIRDjLmmjrwTjvwkMjURWC6eJTNkw*/
