import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        console.log('response data', response.data)
        return response.data
    })
  }

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = person_id => {
    const request = axios.delete(`${baseUrl}/${person_id}`)
    return request.then(response => response.data)
}

const updateNumber = (person_id, newNumber) => {
    console.log(`${baseUrl}/${person_id}`)
    const request = axios.patch(`${baseUrl}/${person_id}`,
        {
          number: newNumber
        }
        )
    return request.then(response => response.data)
}
  

export default { getAll, create, deletePerson, updateNumber }