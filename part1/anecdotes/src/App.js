import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [countVotes, setCountVotes] = useState(
    Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0),
  );
  const handleNextAnecdotes = () => {
    const random = Math.floor(Math.random() * anecdotes.length);

    setSelected(random);
  };
  const handleVote = () => {
    const copy = [...countVotes];
    copy[selected]++;
    setCountVotes(copy);
  };
  const findAnecdotesHasMostVotes = () => {
    let index = 0;
    let max = -Infinity;
    const length = countVotes.length;
    for (let i = 0; i < length; i++) {
      const item = countVotes[i];
      if (item > max) {
        max = item;
        index = i;
      }
    }
    return (
      <p>
        {anecdotes[index]}
        <br />
        has {countVotes[index]} votes
      </p>
    );
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {countVotes[selected]} votes
      <br />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdotes}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      {findAnecdotesHasMostVotes()}
    </div>
  );
};

export default App;
