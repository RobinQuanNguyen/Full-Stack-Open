import React from 'react'
import { useState} from 'react' 
import CountryData from './CountryData'

const Country = ({showCountry, setShowCountry}) => {
    const [selectedCountry, setSelectedCountry] = useState(null)


    const handleShowClick = (country) => {
        setSelectedCountry(country);
    };


    if (selectedCountry) {
        return <CountryData country={selectedCountry} />;
    } else {
        if (showCountry.length === 1) {
            return <CountryData country={showCountry[0]} />;
        } else if (showCountry.length <= 10) {
            return showCountry.map((country) => (
                <div key={country.cca2}>
                {country.name.official}
                {""}
                <button onClick={() => handleShowClick(country)}>show</button>
                {/* <Country showCountry={showCountry} setShowCountry={setShowCountry}> */}
                {/* </Country> */}
                </div>
            ));
        } else {
            return (
                <div>
                Too many matches, specify another filter
                </div>
            );
    }
  }
};

export default Country