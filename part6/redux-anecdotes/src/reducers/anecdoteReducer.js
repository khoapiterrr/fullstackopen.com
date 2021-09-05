import axios from 'axios';
import { clearNotification, setNotification } from './notificationReducer';
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
let idTimeoutPrevious;

const reducer = (state = [], { type, payload }) => {
  console.log('state now: ', state);
  switch (type) {
    case 'VOTE':
      const newState = state.map((item) =>
        item.id === payload.id ? payload : item,
      );
      return newState;
    case 'ADD_NEW':
      return state.concat(payload);
    case 'INIT':
      return payload;
    default:
      return state;
  }

  return state;
};

export const createAnecdotes = (info) => async (dispatch) => {
  const res = await axios.post('http://localhost:3001/anecdotes', info);
  dispatch({
    type: 'ADD_NEW',
    payload: res.data,
  });
};
export const voteAnecdotes = (info) => async (dispatch) => {
  clearTimeout(idTimeoutPrevious);
  const data = { ...info, votes: info.votes + 1 };
  const res = await axios.put(
    'http://localhost:3001/anecdotes/' + data.id,
    data,
  );
  dispatch({
    type: 'VOTE',
    payload: res.data,
  });
  dispatch(setNotification(`You voted '${info.content}'`));
  idTimeoutPrevious = setTimeout(() => {
    dispatch(clearNotification());
  }, 5000);
};

export const initAnecdotes = () => async (dispatch) => {
  const res = await axios.get('http://localhost:3001/anecdotes');
  dispatch({
    type: 'INIT',
    payload: res.data,
  });
};
export default reducer;
