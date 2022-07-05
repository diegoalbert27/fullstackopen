import axios from 'axios'
import React, { useState, useEffect } from 'react'
import FilterPerson from './components/FilterPerson'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        const { data } = res
        setPersons(data)
      })
      .catch(err => console.error(err))
  }, [])

  const handleName = (e) => setNewName(e.target.value)
  
  const handleNumber = (e) => setNewNumber(e.target.value)
  
  const addPerson = (e) => {
    e.preventDefault()

    const isNotAdded = persons.every(person => person.name.toLowerCase() !== newName.toLowerCase())

    if (!isNotAdded) return window.alert(`${newName} is already added to phonebook`)

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const filterName = (e) => {
    const name = e.target.value.toLowerCase()
    setNewFilter(name)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPerson  filteringName={filterName} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={handleName} handleNumber={handleNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={newFilter} />
    </div>
  )
}

export default App
