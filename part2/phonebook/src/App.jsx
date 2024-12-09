import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [notification, setNotification] = useState(null)
  const [notifType, setNotifType] = useState(null)

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
    const message = personsService
    .updateNumber(person.id, personNumber)
    .then(response => {
      setNotification(`${personName}'s phone number has been successfully changed!`)
      setNotifType(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
    .catch(error => {
      setNotification(`Information of ${personName} has already been removed from server`)
      setNotifType(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  })

  }

  const handleAddToPhonebook = (personObject) => {
    setPersons(persons.concat(personObject)) // update personObject in frontend
    personsService.create(personObject) // save personObject to backend
    setNotification(`${personObject.name} has been added`)
    setNotifType(true)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
        : console.log('user cancelled replacing number')
      : handleAddToPhonebook(newPersonObject) // add to phonebook
      

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
      setPersons(persons.filter(person => person.id !== personId))
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
      <Notification message={notification} type={notifType}/>
      <Filter filterChange={handleFilterChange}/>
      <h3>add new person</h3>
      <PersonForm addPerson={addNewPerson} nameChange={handleNameChange} phoneChange={handlePhoneChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} deletePerson={handleDeletePerson}/>

    </div>
  )
}

export default App