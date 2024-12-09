import { useState, useEffect } from 'react'
import weatherInfo from '../services/Weather'

const IndividualCountry = ({ countryQuery, countryData }) => {
    const [weather, setWeather] = useState([])
    const countryName = countryQuery
    const individualCountryData = countryData.find((country) => 
        country.name.common === countryName
    )

    const lang = Object.values(individualCountryData.languages)
    useEffect(() => {
        weatherInfo.getWeather(individualCountryData.capital)
        .then(weatherData => {
            setWeather(weatherData)
        }, [])
    })

    if (weather.length === 0) {
        return null
    }

    return (
        <div>
            <div>
                <h1>{individualCountryData.name.common}</h1>
                <div>capital {individualCountryData.capital}</div>
                <div>area {individualCountryData.area}</div>
                <br />
                <div style={{fontWeight: 'bold'}}>languages:</div>
                <ul>
                    {lang.map((language) => <li>{language}</li>)}
                </ul>
                <img src={individualCountryData.flags.png}/>
                <h2>Weather in {individualCountryData.capital}</h2>
                <div>temperature {weather.current.temp_c} degrees celcius</div>
                <img src={weather.current.condition.icon}/>
                <div>wind {weather.current.wind_kph} kph</div>
            </div>
        </div>
    )
}

export default IndividualCountry