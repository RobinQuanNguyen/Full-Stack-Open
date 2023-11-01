import { useState, useEffect } from 'react'
import Country from './components/Country'
import axios from 'axios'
import countryService from './services/country'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])

  useEffect(() => {
    // axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    //   .then((respone) => {
    //     setCountries(respone.data)
    //   })
    countryService
      .getAll()
      .then((respone) => {
        setCountries(respone.data)
      })

  },[])

  const handleFindCountry = (event) => {
    const searchFilter = event.target.value;
    setFilter(searchFilter);

    setShowCountry(
      countries.filter((country) => 
        country.name.common.toLowerCase().includes(searchFilter.toLowerCase())
      )
    );
  };


  return (
    <div>
      <div>
        find countries <input value = {filter} onChange={handleFindCountry} />
      </div>
        <Country showCountry={showCountry} />
    </div>
  )
}

export default App
