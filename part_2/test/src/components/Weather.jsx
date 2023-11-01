import { useState, useEffect } from "react";
import axios from "axios";


const Weather = ({capital}) => {
    const [weather, setWeather] = useState([])

    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY

    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${API_KEY}`
            )
            .then((respone) => {
                setWeather(respone.data)
            })
    }, [API_KEY, capital])

    return weather.weather? (
        <div>
            <h2>Weather in {capital}</h2>
            <p>temperature {weather.main.temp} Celcius</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <p>wind {weather.mind.speed} m/s</p>
        </div>
    ) : null;
}

export default Weather