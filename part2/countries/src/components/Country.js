import React from 'react';
import axios from 'axios';
const keyMap = process.env.REACT_APP_API_KEY;
export default function Country({ country }) {
  const [weather, setWeather] = React.useState();
  React.useEffect(() => {
    const params = {
      access_key: keyMap,
      query: country.capital,
    };
    console.log(keyMap);
    axios
      .get(`http://api.weatherstack.com/current`, { params })
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h4>languages </h4>
      <ul>
        {country.languages?.length > 0 &&
          country.languages.map((item, key) => <li key={key}>{item.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name} width={200} />
      {weather && (
        <>
          <h4>Weather in {country.capital}</h4>
          <p>
            <b>temperature: {weather.current.temperature} Celsius</b>
          </p>
          <div>
            <img src={weather.current.weather_icons[0]} alt='' />
          </div>
          <p>
            <b>Wind:</b> {weather.current.wind_speed} mph direction{' '}
            {weather.current.wind_dir}
          </p>
        </>
      )}
    </div>
  );
}
