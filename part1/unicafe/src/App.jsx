/* eslint-disable react/prop-types */
import { useState } from "react";

function Statistics({ label, count }) {
  return <StatisticsLine label={label} count={count} />;
}

function StatisticsLine({ label, count }) {
  return (
    <tr>
      <td>{label}</td>
      <td>{count}</td>
    </tr>
  );
}

function Button({ label, onClick: fromBtnOnClick }) {
  return (
    <>
      <button onClick={fromBtnOnClick}>{label}</button>
    </>
  );
}

function App() {
  const [count, setCount] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleGoodClick = () => {
    setCount({ ...count, good: count.good + 1 });
  };

  const handleNeutralClick = () => {
    setCount({ ...count, neutral: count.neutral + 1 });
  };

  const handleBadClick = () => {
    setCount({ ...count, bad: count.bad + 1 });
  };

  const countTotalFeedback = () => {
    return count.good + count.neutral + count.bad;
  };

  const countAverage = () => {
    return (count.good - count.bad) / countTotalFeedback();
  };

  const countPositivePercentage = () => {
    return Math.round((count.good / countTotalFeedback()) * 100);
  };

  return (
    <>
      <div className="container">
        <div className="feedback">
          <h1>give feedback</h1>
          <Button label="good" onClick={handleGoodClick} />
          <Button label="neutral" onClick={handleNeutralClick} />
          <Button label="bad" onClick={handleBadClick} />
        </div>
        <div className="statistics">
          <h2>statistics</h2>

          {countTotalFeedback() === 0 ? (
            <p>No feedback given</p>
          ) : (
            <table>
              <tbody>
                <Statistics label="good" count={count.good} />
                <Statistics label="neutral" count={count.neutral} />
                <Statistics label="bad" count={count.bad} />
                <Statistics label="all" count={countTotalFeedback()} />
                <Statistics label="average" count={countAverage()} />
                <Statistics
                  label="positive"
                  count={countPositivePercentage()}
                />
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
