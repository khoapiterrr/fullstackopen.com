import React, { useState } from 'react';
import Country from './components/Country';
import axios from 'axios';
const App = () => {
  const [countries, setCountries] = useState([]);
  React.useEffect(() => {}, []);
  const [data, setData] = useState();
  const typingTimeout = React.useRef(null);

  const handleOnChangeSearch = (e) => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      setData(null);
      axios
        .get(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 300);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with <input type='text' onChange={handleOnChangeSearch} />
      </p>

      {data ? (
        <Country country={data} />
      ) : countries?.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries?.length === 1 ? (
        <Country country={countries[0]} />
      ) : (
        countries.map((item, index) => (
          <p key={index}>
            {item.name} <button onClick={() => setData(item)}>Show</button>
          </p>
        ))
      )}
    </div>
  );
};
export default App;
