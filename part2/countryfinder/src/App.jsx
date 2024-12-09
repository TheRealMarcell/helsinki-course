import countryFinder from './services/Country'
import { useState, useEffect } from 'react'
import CountryList from './components/CountryList'

const App = () => {
  const[countryData, setCountryData] = useState([])
  const[countryNames, setCountryNames] = useState([])
  const[filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countryFinder
    .getAll()
    .then(response => {
      setCountryData(response)
      setCountryNames(response.map(country => country['name']['common']))
    })
  }, [])

  const handleCountryChange = (event) => {
    const filterKeyword = event.target.value
    const filteredList = countryNames.filter(
      (country) => country.toLowerCase().includes(filterKeyword)
    )
    setFilteredCountries(filteredList)

    
  }

  return (
    <div>
      <h1>Country Finder</h1>
      find countries <input onChange={handleCountryChange}/>
      <div>
        {filteredCountries.length > 10 
        ? <div>Too many matches, specify another filter</div>
        : <CountryList countries={filteredCountries} data={countryData} />
        }
      </div>
    </div>
  )
}

export default App