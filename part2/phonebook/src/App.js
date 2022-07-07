import React, { useState, useEffect } from 'react'
import FilterPerson from './components/FilterPerson'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { getAll, create, remove, update } from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')

  useEffect(() => {
    getAll().then(res => {
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

    if (!isNotAdded) {
      const isConfirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      const updatePerson = persons.find(person => person.name === newName)

      if (isConfirm) {
        update(updatePerson.id, {...updatePerson, number: newNumber})
          .then(res => {
            setPersons(persons.map(person => person.id !== updatePerson.id ? person : res.data))
            setMessage(`Updated number ${res.data.number} to ${res.data.name}`)
            setType('success')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(err => {
            console.error(err)
            setMessage(`Information of ${updatePerson.name} has already been removed from server`)
            setType('error')
          })
      }

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    create(newPerson)
      .then(res => {
        setPersons(persons.concat(res.data))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${res.data.name}`)
        setType('success')
        
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(err => console.error(err))
  }

  const filterName = (e) => {
    const name = e.target.value.toLowerCase()
    setNewFilter(name)
  }

  const removePerson = (person) => {
    const isConfirm = window.confirm(`Delete ${person.name}?`)
    const { id } = person

    if (isConfirm) {
      remove(id)
        .then(res => {
          if (res.status === 200) {
            const newPersons = persons.filter(person => person.id !== id)
            setPersons([...newPersons])
          }
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={type} message={message} />
      <FilterPerson  filteringName={filterName} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={handleName} handleNumber={handleNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={newFilter} removePerson={removePerson} />
    </div>
  )
}

export default App
