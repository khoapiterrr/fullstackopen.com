import React, { useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSubmit = (newUser) => {
    const checkExists = persons.find((x) => x.name === newUser.name);
    if (checkExists) {
      alert(`${newUser.name} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newUser));
  };
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <p>
        filter shown with <input type='text' onChange={handleOnChangeSearch} />
      </p>
    </div>
  );
};
export default App;
