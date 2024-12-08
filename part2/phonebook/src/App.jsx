import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const persons_names = persons.map(obj => obj['name'])

  const addNewPerson = (event) => {
    event.preventDefault()
    const newPersonObject = {
      name: newName,
      phone: newPhone
    }
    persons_names.includes(newName) // check if name already in phonebook
      ? alert(`${newName} is already added to phonebook`) 
      : setPersons(persons.concat(newPersonObject)) 
    
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
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
      <Persons persons={persons} />

    </div>
  )
}

export default App