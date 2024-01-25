import { useState } from 'react';
//Buttons
const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};
//StatisticLine
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  );
};
//Statistics
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const averageScore = (good - bad) / all || 0;
  const positivePercentage = (good / all) * 100 || 0;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="Average" value={averageScore.toFixed(1)} />
          <StatisticLine
            text="Positive"
            value={`${positivePercentage.toFixed(1)}%`}
          />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
 
  const handleFeedback = (feedback) => {
    if (feedback === 'good') {
      setGood(good + 1);
    } else if (feedback === 'neutral') {
      setNeutral(neutral + 1);
    } else if (feedback === 'bad') {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button text="Good" handleClick={() => handleFeedback('good')} />
        <Button text="Neutral" handleClick={() => handleFeedback('neutral')} />
        <Button text="Bad" handleClick={() => handleFeedback('bad')} />
      </div>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
