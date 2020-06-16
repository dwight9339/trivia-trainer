import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from "axios";
import styles from "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  async function getNewQuestion(){
    const data = await axios.get("http://jservice.io/api/random");
    const q = data.data[0];

    setQuestion(q.question);
    setAnswer(q.answer);
    setRevealAnswer(false);
    setQuestionCount(questionCount + 1);
  }

  useEffect(() => {
    getNewQuestion();
  }, []);

  let infoPanel = (
    <div className="infoPanel">
      <div className="questionNumber">Question {questionCount}</div>
      <div className="rightCount">Correct: {rightCount}</div>
      <div className="wrongCount">Incorrect: {wrongCount}</div>
    </div>
  )

  let buttonPanel = (
    <div className="buttonPanel">
      <button className="nextQ" onClick={() => {setWrongCount(wrongCount + 1); getNewQuestion();}}>Wrong...</button>
      <button className="nextQ" onClick={() => {setRightCount(rightCount + 1); getNewQuestion();}}>Correct!</button>
    </div>
  )

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivia Trainer</h1>
      </header>
      {infoPanel}
      <div className="mainBody">
        <div className="questionText">{ question }</div>
        <div className="answerText" onClick={() => setRevealAnswer(!revealAnswer)}>{ revealAnswer ? answer.replace( /(<([^>]+)>)/ig, '') : "Click to reveal answer" }</div>
        {revealAnswer ? buttonPanel : null}
      </div>
    </div>
  );
}
export default App;
