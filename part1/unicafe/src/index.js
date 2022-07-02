import React, { useState } from "react"
import ReactDOM from "react-dom/client"

const Title = ({ title }) => <h1>{title}</h1>

const Button = ({ text, addComent }) => {
  return <button onClick={() => addComent()}>{text}</button>
}

const Statistic = ({ text, value }) => {
  if (value === 0 && text === "good") {
    return (
      <tr>
        <td>No feedback given</td>
      </tr>
    )
  }

  if (value === 0 || isNaN(value)) {
    return <tr></tr>
  }

  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral
  const average = (good * 1 + bad * -1) / total
  const positive = (good / total) * 100

  return (
    <table>
      <tbody>
        <Statistic text={"good"} value={good} />
        <Statistic text={"neutral"} value={neutral} />
        <Statistic text={"bad"} value={bad} />
        <Statistic text={"all"} value={total} />
        <Statistic text={"average"} value={average} />
        <Statistic text={"positive"} value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title={"Give feedback"} />

      <Button text={"good"} addComent={() => setGood((good) => good + 1)} />
      <Button
        text={"neutral"}
        addComent={() => setNeutral((neutral) => neutral + 1)}
      />
      <Button text={"bad"} addComent={() => setBad((bad) => bad + 1)} />

      <Title title={"Statistic"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
