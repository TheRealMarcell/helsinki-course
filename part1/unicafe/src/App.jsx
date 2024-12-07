import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text} </td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={props.all}/>
        <StatisticLine text='average' value={props.avg}/>
        <StatisticLine text='positive' value={`${props.percent} %`}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [percent, setPercent] = useState(0)

  const setGoodValue = () => {
    const newGood = good + 1
    const total = newGood + neutral + bad
    const percent = (newGood / total) * 100
    setGood(newGood)
    setAll(total)
    setPercent(percent)
    setAvg(((newGood*1) + (neutral*0) + (bad*-1))/total)
  }
  
  const setNeutralValue = () => {
    const newNeutral = neutral + 1
    const total = good + newNeutral + bad
    const percent = (good / total) * 100
    setNeutral(newNeutral)
    setAll(total)
    setPercent(percent)
    setAvg(((good*1) + (newNeutral*0) + (bad*-1))/total)
  }

  const setBadValue = () => {
    const newBad = bad + 1
    const total = good + neutral + newBad
    const percent = (good / total) * 100
    setBad(newBad)
    setAll(total)
    setPercent(percent)
    setAvg(((good*1) + (neutral*0) + (newBad*-1))/total)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setGoodValue} text="good"/>
      <Button handleClick={setNeutralValue} text="neutral"/>
      <Button handleClick={setBadValue} text="bad"/>
 
      <h1>stats</h1>

      <Statistics good={good} bad={bad} neutral={neutral} all={all} avg={avg} percent={percent}/>
    </div>
  )
}

export default App