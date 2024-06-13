/* eslint-disable react/prop-types */

import { useState } from "react";

function Anecdotes({ anecdote, votes }) {
  return (
    <>
      <div>{anecdote}</div>
      <div>Has {votes} votes</div>
    </>
  );
}

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

export default function App() {
  const anecdotes = [
    "A bug in the code is worth two in the documentation.",
    "Real programmers count from zero.",
    "There are only two hard things in computer science: cache invalidation, naming things, and off-by-one errors.",
    "I don't have a solution, but I do admire the problem.",
    "It's not a bug; it's an undocumented feature.",
    "Weeks of coding can save you hours of planning.",
    "To understand what recursion is, you must first understand recursion.",
    "There are 10 types of people in the world: those who understand binary and those who don't.",
    "The best code is no code at all.",
    "Simplicity is the soul of efficiency.",
    "First, solve the problem. Then, write the code.",
    "Copy-and-paste is a design error.",
    "Code is like humor. When you have to explain it, it’s bad.",
    "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
    "Programming is 10% writing code and 90% figuring out why it doesn’t work.",
    "If debugging is the process of removing bugs, then programming must be the process of putting them in.",
    "Writing code without tests is like driving a car with your eyes closed.",
    "A good programmer is someone who looks both ways before crossing a one-way street.",
    "Programs must be written for people to read, and only incidentally for machines to execute.",
    "In software, the most beautiful code, the most beautiful functions, and the most beautiful programs are sometimes not there at all.",
    "Debugging is twice as hard as writing the code in the first place.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Commenting your code is like cleaning your bathroom – you never want to do it, but it really does create a better experience for you and your guests.",
    "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
    "Software undergoes beta testing shortly before it’s released. Beta is Latin for 'still doesn’t work.'",
  ];
  
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(Array(anecdotes.length).fill(0));

  const handleClick = () => {
    setIndex(Math.floor(Math.random() * anecdotes.length));
  };

  const votes = [...count];

  const voteClick = () => {
    votes[index] += 1;
    setCount(votes);
  };

  const maxVotes = Math.max(...votes);
  const maxIndex = votes.indexOf(maxVotes);

  return (
    <>
      <div className="container">
        <h1>Anecdote of the day</h1>
        <Anecdotes anecdote={anecdotes[index]} votes={votes[index]} />
        <Button text={"vote"} onClick={voteClick} />
        <Button text={"next anecdote"} onClick={handleClick} />

        {maxVotes > 0 ? (
          <div>
            <h1>Anecdote with most votes</h1>
            <Anecdotes anecdote={anecdotes[maxIndex]} votes={maxVotes} />
          </div>
        ) : null}
      </div>
    </>
  );
}
