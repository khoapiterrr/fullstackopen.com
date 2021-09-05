import React from 'react';
import { connect } from 'react-redux';
import { asObject, createAnecdotes } from '../reducers/anecdoteReducer';
const AnecdoteForm = ({ createAnecdotesAction }) => {
  const addNew = async (event) => {
    event.preventDefault();
    const newData = asObject(event.target.name.value);
    createAnecdotesAction(newData);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name='name' />
        </div>
        <button>create</button>
      </form>
    </>
  );
};
const mapDispatchToProps = {
  createAnecdotesAction: createAnecdotes,
};

AnecdoteForm.propTypes = {};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
