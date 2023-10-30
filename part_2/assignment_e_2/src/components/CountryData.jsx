const CountryData = ({ country }) => {
    return (
      <div>
        <h2>{country.name.official}</h2>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(country.language).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
    );
  };
export default CountryData