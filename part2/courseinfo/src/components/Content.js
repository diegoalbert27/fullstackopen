import React from "react"
import Part from "./Part"

const Content = ({ parts }) => {
  const total = parts
    .map((part) => part.exercises)
    .reduce((a, b) => a + b, 0)
  
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p><b>Total of {total} exercises</b></p>
    </div>
  )
}

export default Content
