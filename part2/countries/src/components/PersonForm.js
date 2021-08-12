import React, { useState } from 'react';

export default function PersonForm({ handleSubmit }) {
  const [newUser, setNewUser] = useState({
    name: '',
    number: '',
  });
  const handleOnChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(newUser);
    setNewUser({
      name: '',
      number: '',
    });
  };
  return (
    <form onSubmit={submitForm}>
      <div>
        name:{' '}
        <input name='name' value={newUser.name} onChange={handleOnChange} />
      </div>
      <div>
        number:{' '}
        <input name='number' value={newUser.number} onChange={handleOnChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
}
