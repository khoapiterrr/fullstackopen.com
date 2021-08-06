import React, { useState } from 'react';

// const StatisticLine = ({ text, value }) => (
//   <p>
//     {text} {value}
//   </p>
// );
const Statistics = ({ good, bad, neutral }) => {
  const sum = good + neutral + bad;
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{sum}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(good - bad) / sum}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td> {(good * 100) / sum} %</td>
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const sum = good + neutral + bad;
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood((old) => old + 1)}>good</button>
      <button onClick={() => setNeutral((old) => old + 1)}>neutral</button>
      <button onClick={() => setBad((old) => old + 1)}>bad</button>
      <h1>statistics</h1>
      {sum === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  );
};

export default App;
