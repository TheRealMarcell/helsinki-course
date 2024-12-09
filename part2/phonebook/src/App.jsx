import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  },[])

  const persons_names = persons.map(obj => obj['name'])

  const replacePerson = (personName, personNumber) => {
    const person = persons.find((person) => person.name === personName)
    personsService.updateNumber(person.id, personNumber)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const newPersonObject = {
      name: newName,
      number: newPhone,
      id: (persons.length+1).toString()
    }
    persons_names.includes(newName) // check if name already in phonebook
      ? confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) 
        ? replacePerson(newName, newPersonObject.number) // ask user if they want to replace the number
        : console.log('cancel replacing number')
      : (setPersons(persons.concat(newPersonObject)), 
      personsService.create(newPersonObject))
      

  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleDeletePerson = (personId) => {
    personsService.deletePerson(personId)
    .then(response =>
      setPersons(persons.filter(person => person.id != personId))
    )
    

}

  const handleFilterChange = (event) => {
    let personsCopy = [...persons]
    const filtered_persons = personsCopy.filter((person) => person.name.toLowerCase().includes(event.target.value))
    console.log('persons', persons)
    setPersons(filtered_persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChange={handleFilterChange}/>
      <h3>add new person</h3>
      <PersonForm addPerson={addNewPerson} nameChange={handleNameChange} phoneChange={handlePhoneChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} deletePerson={handleDeletePerson}/>

    </div>
  )
}

export default App