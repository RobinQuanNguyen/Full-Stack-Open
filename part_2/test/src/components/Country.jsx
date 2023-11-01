import React from 'react'
import { useState} from 'react' 
import CountryData from './CountryData'

const Country = ({showCountry, setShowCountry}) => {
    const [selectedCountry, setSelectedCountry] = useState(null)

    return <CountryData country={showCountry} />;
       
  
};

export default Country