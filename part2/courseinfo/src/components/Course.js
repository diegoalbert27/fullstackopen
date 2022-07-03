import React from 'react'

const Header = ({ title }) => <h2>{title}</h2>

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

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Course = ({ course })  => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course
