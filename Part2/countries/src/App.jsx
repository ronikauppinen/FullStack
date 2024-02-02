/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import services from './assets/services';

const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    Find countries <input value={searchTerm} onChange={handleSearchChange} />
  </div>
);

const Countries = ({ countries, searchTerm }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

  if (selectedCountry) {
    const country = selectedCountry;

    return (
      <div>
        <button onClick={() => setSelectedCountry(null)}>Back to List</button>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.svg}
          alt={`${country.name.common} Flag`}
          width="100"
        />
      </div>
    );
  }

  return (
    <div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, please make your query more specific.</p>
      ) : (
        filteredCountries.map((country) => (
          <div key={country.alpha3Code}>
            <p>
              {country.name.common}{' '}
              <button onClick={() => handleShowDetails(country)}>
                Show Details
              </button>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    services
      .getAllCountries()
      .then((initialCountries) => {
        setCountries(initialCountries);
      })
      .catch((error) => {
        console.error('Error fetching data:' + error);
      });
  }, []);

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Countries</h3>
      <Countries countries={countries} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
