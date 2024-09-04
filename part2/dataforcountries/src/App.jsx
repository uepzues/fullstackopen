import { useState, useEffect } from "react";
import APIService from "./services/APIService";

const SearchDiv = ({ onChange, value, info }) => {
  return (
    <div>
      find country <br />
      <input type="text" value={value} onChange={onChange} />
      <p>{info}</p>
    </div>
  );
};

const Result = ({ result, showCountry, location, weather }) => {
  return (
    <div className="result">
      {showCountry ? (
        <ShowCountry result={result} />
      ) : (
        <div>
          {result.map((c) => (
            <div key={c.cca2}>
              <p>{c.name.common}</p>
              <button onClick={() => location(c.capital[0])}>show</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Weather = ({ weather }) => {
  return (
    <div>
      {weather && (
        <div>
          <p>{weather.temp}</p>
          <p>{weather.main}</p>
          <p>{weather.description}</p>
          <p>{weather.icon}</p>
          <p>{weather.clouds}</p>
        </div>
      )}
    </div>
  );
};
const ShowCountry = ({ result }) => {
  const countries = Array.isArray(result) ? result : [result];

  const country = countries[0] || null;

  return (
    <div className="countryResult">
      <h1>{country?.name.common || null}</h1>
      <h2>{country?.region || null}</h2>
      <div>
        {country?.altSpellings
          ? country?.altSpellings.map((s) => <span key={s}>{s}, </span>)
          : null}
      </div>
      <h2>{country?.capital || ""}</h2>
      <div>
        {country?.flags?.png ? (
          <img src={country?.flags.png} alt={country?.flags.alt || ""} />
        ) : null}
      </div>
      <div>
        {country && <h3>Languages</h3>}
        <ul>
          {country?.languages
            ? Object.values(country?.languages).map((l) => <li key={l}>{l}</li>)
            : null}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [showCountry, setShowCountry] = useState(false);
  //location is country code
  const [location, setlocation] = useState(null);
  const [info, setInfo] = useState(null);
  const [weather, setWeather] = useState({
    temp: "",
    main: "",
    description: "",
    icon: "",
    clouds: "",
  });

  useEffect(() => {
    APIService.getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
    setlocation(null);
    setInfo(null);
    setWeather({});
  };

  const handleClick = (id) => {
    setlocation(id);
  };

  useEffect(() => {
    if (search.length > 0) {
      const filteredCountries = countries.filter((c) => {
        return c.name.common.toLowerCase().includes(search.toLowerCase());
      });

      if (filteredCountries.length === 1 || location !== null) {
        setInfo(null);
        const countryGet = location || filteredCountries[0]?.name.common;

        if (countryGet) {
          APIService.getWeather(countryGet).then((data) => {
            setWeather({
              temp: data.data.main.temp,
              main: data.data.weather[0].main,
              description: data.data.weather[0].description,
              icon: data.data.weather[0].icon,
              clouds: data.data.clouds.all,
            });
          });
        }
        setResult(filteredCountries);
        setShowCountry(true);
      } else if (filteredCountries.length > 10) {
        console.log("please be more specific");
        setResult([]);
        setInfo("please be more specific");
      } else {
        setInfo("There are no matches");
        setShowCountry(false);
        setResult(filteredCountries);
      }
    } else {
      setShowCountry(false);
      setResult([]);
    }
  }, [search, countries, location]);

  return (
    <>
      <div className="App">
        <h1>Country Info</h1>
        <SearchDiv onChange={handleChange} value={search} info={info} />
        <Result
          result={result}
          showCountry={showCountry}
          location={handleClick}
          weather={weather}
        />
        {/* {console.log("app page", weather)} */}
        <Weather weather={weather} />
      </div>
    </>
  );
};

export default App;
