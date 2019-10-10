import React, { useState, useEffect } from 'react'
import FilterLomake from './components/FilterLomake'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [selected, setSelected] = useState('')
  const [errorMessage, setErrorMessage] = useState('something bad has happened')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const t = persons.map(p => p.name)
    if (!t.includes(newName)) {

      //      console.log('Henkilö ei löydy listasta')
      personService
        .create(personObject)
        .then(data => {
          setPersons(persons.concat(data))
        })
        .catch(error => {
          console.log('virhe dangerdanger')
          setErrorMessage(`Person ${personObject.name} was successfully added`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } else {
      window.alert(`Puhelinluettelo sisältää jo syöttämäsi nimen ${newName}, haluatko korvata vanhan numeron uudella?`)

      const pId = persons.find(person => person.name === newName)
      const changedPerson = { name: pId.name, number: newNumber, id: pId.id }

      personService
        .update(pId.id, changedPerson)
        .then(
          setPersons(persons)
        )
        .catch(error => {
          setErrorMessage(`Person '${personObject.name}' was already removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setSelected(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const deletePerson = (id) => {

    const personToBeDeleted = persons.find(person => person.id === id)

    personService
      .deletePerson(id)
      .then(() => {
        const eiPoistetut = persons.filter(p =>
          p.id !== personToBeDeleted.id)
        setPersons(eiPoistetut)
      })
      .catch(error => {
        setErrorMessage(
          `person coudn't be deleted`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} />

      <div>
        filter shown with <input value={selected}
          onChange={handleFilter}
        />
      </div>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input value={newNumber}
            onChange={handleNumberChange}
          />
        </div>

        <div>
          <button type="submit"> Submit</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <FilterLomake selected={selected} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App