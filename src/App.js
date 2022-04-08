import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import QuizQuestion from './QuizQuestion.js';

function App() {

  const [questionData, setQuestionData] = useState([])
  const [userInput, setUserInput] = useState([])

  // Hacky way to fix unicode characters from fetch response
  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  // Fetch question from open trivia api and set to questionData state
  const generateQuiz = () => {
    fetch('https://opentdb.com/api.php?amount=10').then(res => res.json()).then(data => setQuestionData(data.results.map((item) => {
      return ({...item, "id": nanoid(), "userSelection": '', "userAnsweredCorrectly": false})
    })))
  }

  // Map each question from questionData into a QuizQuestion component
  let questionElements = questionData.map((question) => {
    return(
      <QuizQuestion
      chooseAnswer={(e) => handleChange(e)}
      key={nanoid()}
      id={question.id}
      question={decodeString(question.question)}
      choices={[...question.incorrect_answers, question.correct_answer].map((answer) => decodeString(answer))}
      userSelection={question.userSelection}
      userAnsweredCorrectly={question.userAnsweredCorrectly}
      />
    )
  })

  const handleChange = (e) => {
    let userAnswer = e.currentTarget.value
    setQuestionData((prev) => prev.map((item) => {
      return {
        ...item,
        "userSelection": userAnswer,
        "userAnsweredCorrectly": userAnswer === decodeString(item.correct_answer)
      }
    }))
  }

  useEffect(() => {
    generateQuiz()
  }, [])

  console.log(questionData)

  return (
    <div className="App">
      <div className="content">
        {questionElements}
      </div>
    </div>
  );
}

export default App;
