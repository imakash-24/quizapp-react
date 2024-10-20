import './App.css'
import questionData from './question.json'
import { useEffect, useState } from 'react'

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [timer,setTimer] = useState(10)

  useEffect(()=>{
      let interval
      if(timer>0 && !showScore)
      {
        interval = setInterval(()=>{
          setTimer((prevTimer)=> prevTimer-1)
        },1000)
      }
      else{
        clearInterval(interval)
        setShowScore(true)
      }

      return ()=>clearInterval(interval)  
  },[timer,showScore])

  
  const handleAnswerClick = (selectedOption)=>{
      if(selectedOption===questionData[currentQuestion].correctOption){
        setScore((prevScore)=>prevScore+1)
      }

      if(currentQuestion<questionData.length-1)
      {
        setCurrentQuestion((prevQuestion)=>prevQuestion+1)
        setTimer(10)
      }
      else{
        setShowScore(true)
      }
  }

  const restartHandler = () => {
    setScore(0)
    setCurrentQuestion(0)
    setShowScore(false)
    setTimer(10)
  }

  return (
    <>
      <div className="quiz-app">
          {showScore ? (
              <div className="score-section" >
                  You scored : {score}/{questionData.length}
                  <div className='restart'>
                  <button onClick={restartHandler}>Restart</button>
                  </div>
                  
                  
              </div>
          ) : (
            <div className="question-section" >
            <h2>Question {currentQuestion +1}</h2>
             <p>{questionData[currentQuestion].question}</p>
             <div className="options">
                 {questionData[currentQuestion].options.map((option,index) => (
        <button key={index} onClick={()=>handleAnswerClick(option)}>{option}</button>
                 ))}
             </div>
             <div className="timer">Time left: {timer}s</div>
        </div>
              )}
      </div>
    </>
  )
}

export default App