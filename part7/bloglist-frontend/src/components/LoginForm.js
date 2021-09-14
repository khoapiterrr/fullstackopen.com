import React from 'react';

function LoginForm({ onLogin }) {
  const [value, setValue] = React.useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    onLogin(value, clearForm);
  };
  const clearForm = () => {
    setValue({});
  };
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2>Login to application</h2>
      <div>
        <label htmlFor='username'>username : </label>
        <input type='text' name='username' onChange={onChange} />
      </div>
      <div>
        <label htmlFor='password'>password : </label>
        <input type='password' name='password' onChange={onChange} />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
}

export default LoginForm;
