import { useState, useEffect } from 'react'
import Country from './components/Country'
import axios from 'axios'
import dotenv from 'dotenv'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])
  dotenv.config();

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/name/finland")
      .then((response) => {
        // Log the response.data to the console
        console.log(response.data);
        // Set the countries state with the response data
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default App
