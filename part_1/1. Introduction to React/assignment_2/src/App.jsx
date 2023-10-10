import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics: </h1>
        No feed back given
      </div>
    )
  }
  const total = good + neutral + bad

  const average = ((good - bad) / total)

  const positive = good / total

  return (
    <div>
      <h1>statistics: </h1>
      <table>
        <tbody>
          <tr> 
            <td>Good</td>
            <td>{good}</td>
          </tr>

          <tr>  
            <td>Neutral</td>
            <td>{neutral}</td>
          </tr>

          <tr>
            <td>Bad</td>
            <td>{bad}</td>
          </tr>

          <tr>
            <td>Total</td>
            <td>{total}</td>
          </tr>

          <tr>
            <td>Average</td>
            <td>{average}</td>
          </tr>

          <tr>
            <td>Positive</td>
            <td>{positive}</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine= ({text, value}) => {
  return (
  <div>
    {text} : {value}
  </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  

  return (
    <div>
      <h1>give feedback</h1>

      <Button text = "Good" handleClick={handleGoodClick} />
      <Button text = "Neutral" handleClick={handleNeutralClick} />
      <Button text = "Bad" handleClick={handleBadClick} />


      <Statistics good= {good} neutral = {neutral} bad = {bad} />

    </div>
  )
}

export default App
