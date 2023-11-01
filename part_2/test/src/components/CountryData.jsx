import Weather from "./Weather";

const CountryData = ({ country }) => {
  return (
    <div>
      {country && (
        <div>
          <h2>{country.altSpellings[0]}</h2>
          <p>capital: {country.capital}</p>
          <p>area: {country.area}</p>
          <h3>languages</h3>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt="Flag" />
          <Weather capital={country.capital} />
        </div>
      )}
    </div>
  );
};
export default CountryData;
