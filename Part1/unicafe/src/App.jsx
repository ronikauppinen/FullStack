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
  const totalFeedback = good + neutral + bad;
  const averageScore = (good - bad) / totalFeedback || 0;
  const positivePercentage = (good / totalFeedback) * 100 || 0;

  if (totalFeedback === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h2>Statistics:</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
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
//Anecdote
const Anecdote = ({ anecdotes, selected }) => <p>{anecdotes[selected]}</p>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];
  const [selectedAnecdote, setSelectedAnecdote] = useState(0);
  const initialVotes = new Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(initialVotes);

  const handleFeedback = (feedback) => {
    if (feedback === 'good') {
      setGood(good + 1);
    } else if (feedback === 'neutral') {
      setNeutral(neutral + 1);
    } else if (feedback === 'bad') {
      setBad(bad + 1);
    }
  };
  const handleNextAnecdote = () => {
    const nextIndex = (selectedAnecdote + 1) % anecdotes.length;
    setSelectedAnecdote(nextIndex);
  };
  const handleVote = (index) => {
    const newVotes = [...votes];
    newVotes[index] += 1;
    setVotes(newVotes);
  };
  const MostVotedAnecdote = () => {
    return votes.indexOf(Math.max(...votes));
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button text="Good" handleClick={() => handleFeedback('good')} />
        <Button text="Neutral" handleClick={() => handleFeedback('neutral')} />
        <Button text="Bad" handleClick={() => handleFeedback('bad')} />
      </div>
      {good + neutral + bad > 0 && (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}

      <h2>Anecdote of the day</h2>
      <Anecdote
        anecdotes={anecdotes}
        selected={selectedAnecdote}
        votes={votes}
        handleVote={handleVote}
        handleNextAnecdote={handleNextAnecdote}
      />
      <Button text="Vote" handleClick={() => handleVote(selectedAnecdote)} />
      <Button text="Next Anecdote" handleClick={handleNextAnecdote} />

      <h2>Anecdote with most votes</h2>
      <Anecdote anecdotes={anecdotes} selected={MostVotedAnecdote()} />
    </div>
  );
};

export default App;
