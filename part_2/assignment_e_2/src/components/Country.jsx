import React from 'react'
import CountryData from './CountryData'

const Country = ({showCountry, setShowCountry}) => {
    if (showCountry.length === 1)
    {
        return (
            <CountryData country = {showCountry[0]}/>
        )
    }
    else if (showCountry.length <= 10) {
        return (
            <div>
                {showCountry.map((country) => (
                    <div key={country.alpha2Code}>{country.official}</div>
                ))}
            </div>
        )
    }
    else {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    
    
}

export default Country