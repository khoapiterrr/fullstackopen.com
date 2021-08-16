import React, { useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phoneBookService from './phoneBookservice';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState('');
  const [err, setErr] = useState({ error: false, messages: '' });

  React.useEffect(() => {
    phoneBookService
      .getAll()
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
      alert(
        `${newUser.name} is already added to phonebook, replace the old number with a new one`,
      );
      phoneBookService
        .update(checkExists.id, newUser)
        .then((res) => {
          const newPersons = persons.map((item) =>
            item.id === checkExists.id ? res.data : item,
          );
          setPersons(newPersons);
        })
        .catch((err) => {
          setErr({
            error: true,
            messages: `Information of ${newUser.name} was already removed from server`,
          });
        });
      return;
    }
    phoneBookService
      .create(newUser)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setErr({
          error: false,
          messages: `Added ${newUser.name}`,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      setErr({ error: false, messages: '' });
    }, 3000);
  };
  const handleDeleteById = (data) => {
    if (window.confirm(`Delete ${data.name} ?`)) {
      phoneBookService.deleteById(data.id).then((res) => {
        setPersons(persons.filter((x) => x.id !== data.id));
      });
    }
  };
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <h1>Phonebook</h1>
      {err.messages && (
        <div className={err.error ? 'error' : 'success'}>{err.messages}</div>
      )}
      <p>
        filter shown with <input type='text' onChange={handleOnChangeSearch} />
      </p>
      <h1>Add a new</h1>
      <PersonForm handleSubmit={handleSubmit} />
      <Persons
        persons={persons}
        search={search}
        onDeletePerson={handleDeleteById}
      />
    </div>
  );
};
export default App;
