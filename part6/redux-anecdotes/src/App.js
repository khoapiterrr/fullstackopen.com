import React from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import axios from 'axios';
import { initAnecdotes } from './reducers/anecdoteReducer';
const App = () => {
  const [keyword, setKeyword] = React.useState('');
  const dispatch = useDispatch();
  React.useEffect(() => {
    axios.get('http://localhost:3001/anecdotes').then((response) => {
      dispatch(initAnecdotes(response.data));
    });
  });
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter onChangeKeyword={setKeyword} />
      <AnecdoteList keyword={keyword} />
      <AnecdoteForm />
    </div>
  );
};

export default App;
