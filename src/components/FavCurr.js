import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
function FavCurr(props) {
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
            options={props.favCurr.map((curr) => curr.symbol)}
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
