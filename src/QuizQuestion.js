import { nanoid } from 'nanoid'
import './QuizQuestions.css'

export default function QuizQuestion ({id, question, choices, chooseAnswer, userSelection, userAnsweredCorrectly}) {

  return(
    <div className="quiz-question">
      <h4>{question}</h4>
      <div id={id}>
        {choices.map((choice) => {
          return(
            <label>{choice}
              <input
                checked={userSelection === choice}
                key={nanoid()}
                id={id}
                name={question}
                type="radio"
                value={choice}
                onChange={chooseAnswer}
              />
            </label>
          )
        })}
      </div>
    </div>
  )
}