import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countryService from './services/country'
import Country from './components/Country'
import CountryData from './components/CountryData'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(respond => {
        setCountries(respond.data)
      })

  },[])

  const handleFindCountry = (event) => {
    const searchFilter = event.target.value;
    setFilter(searchFilter);

    const filteredCountries = countries.filter((country) =>
      country.name.official.toLowerCase().includes(searchFilter.toLowerCase())
    );

    setShowCountry(filteredCountries);
  };


  return (
    <div>
      <div>
        <Filter filter = {filter} handleFindCountry = {handleFindCountry}/>
      </div>

      {/* {foundCountries.map((country) => (
        <Country 
          key={country.alpha2Code} country={country}
          />
      ))} */}

    {showCountry.length === 1 ? (
      <CountryData country={showCountry[0]} />
    ) : showCountry.length <= 10 ? (
      <Country showCountry={showCountry} />
    ) : (
      <div>
        Too many matches, specify another filter
      </div>
    )}

    </div>
  )
}

export default App
