import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})
  const [favorite, setFavorite] = useState(0)

  const generateRandomNumber = () => {
    let x = Math.floor(Math.random() * 8);
    console.log(x)
    setSelected(x)
  }

  const voteForAnecdote = () => {
    const newPoints = {...points}
    newPoints[selected] += 1
    setPoints(newPoints)

    let keys = Object.keys(newPoints);
    let max = 0;
    let max_key;
    console.log(keys)
    for (let i = 0; i < keys.length; i++) {
      let value = newPoints[keys[i]];
      if (value > max){
        max = value
        console.log(max, 'max')
        max_key = i
      } 
    }
    setFavorite(max_key)

  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <div>
        <button onClick={voteForAnecdote}>vote</button>
        <button onClick={generateRandomNumber}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[favorite]}
    </div>
  )
}

export default App