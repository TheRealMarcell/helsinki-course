import IndividualCountry from './IndividualCountry'
import { useState } from 'react'

const DisplayCountries = ({ countryData, allData, toggleBool, setDisplay}) => {
    return (
        countryData.length === 1 // check if only single country displayed
        ? <div><IndividualCountry countryQuery={countryData[0]} countryData={allData}/></div>
        : <div>{countryData.map((country) => 
            <div>
                {country}
                <button onClick={() => {
                    toggleBool()
                    setDisplay(country)
                }}>show</button>
            </div>)}
        </div>
    )
}

const CountryList = ({ countries, data }) => {
    const[bool, setBool] = useState(true)
    const[individualDisplay, setIndividualDisplay] = useState('')

    const toggleBool = () => {
        setBool(!bool)
    }
    
    return (
        bool  // trigger to check if button is clicked
        ? <DisplayCountries countryData={countries} allData={data} toggleBool={toggleBool} setDisplay={setIndividualDisplay}/>
        : <IndividualCountry countryQuery={individualDisplay} countryData={data}/>
    )
}

export default CountryList