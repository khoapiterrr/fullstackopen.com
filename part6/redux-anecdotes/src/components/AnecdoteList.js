import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { voteAnecdotes } from '../reducers/anecdoteReducer';
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer';
import axios from 'axios';

const AnecdoteList = ({ keyword, anecdotes, voteAnecdotesAction }) => {
  const anecdoteList = anecdotes(keyword);

  const vote = async (anecdote) => {
    voteAnecdotesAction(anecdote);
  };
  return (
    <>
      {anecdoteList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: (keyword) =>
      state.anecdotes
        .filter((x) => x.content.includes(keyword))
        .sort((a, b) => b.votes - a.votes),
  };
};
const mapDispatchToProps = {
  voteAnecdotesAction: voteAnecdotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
