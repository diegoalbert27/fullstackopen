import React from 'react'
import Person from './Person'

const Persons = ({ persons, search }) => {
  return (
    <div>
      {
        persons
          .filter(person => person.name.toLowerCase().includes(search))
          .map(person => <Person key={person.name} person={person} />)
      }
    </div>
  )
}

export default Persons