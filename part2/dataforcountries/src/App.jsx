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

const Result = ({ result, showCountry, location }) => {
  return (
    <div className="result">
      {/* {console.log("result", result)} */}
      {showCountry ? (
        <ShowCountry result={result} />
      ) : (
        <div>
          {result.map((c) => (
            <div key={c.cca2}>
              <p>{c.name.common}</p>
              <button onClick={() => location(c.capital[0], c.cca2)}>
                show
              </button>
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
  const [countryId, setCountryId] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

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
    setIsButtonClicked(false);
  };

  const handleClick = (loc, id) => {
    // console.log("clicked", loc, id);
    setlocation(loc);
    setCountryId(id);
    setIsButtonClicked(true);
  };

  useEffect(() => {
    if (search.length > 0) {
      const filteredCountries = countries.filter((c) => {
        return c.name.common.toLowerCase().includes(search.toLowerCase());
      });

      if (
        filteredCountries.length === 1 ||
        location !== null ||
        isButtonClicked
      ) {
        setInfo(null);

        const bansa = filteredCountries.find((c) => c.cca2 === countryId);

        const countryGet = location || filteredCountries[0]?.name.common;

        const updatedWeather = (data) => {
          setWeather({
            temp: data.main.temp,
            main: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            clouds: data.clouds.all,
          });
        };

        if (isButtonClicked && bansa) {
          // console.log("button clicked", isButtonClicked);
          APIService.getWeather(bansa.capital[0]).then((data) => {
            updatedWeather(data);
          });
          setShowCountry(true);
          setResult([bansa]);
          return;
        }

        if (countryGet) {
          APIService.getWeather(countryGet)
            .then((data) => {
              updatedWeather(data);
              setResult(filteredCountries);
              setShowCountry(true);
              setInfo(null);
            })
            .catch((error) => console.log(error.message));
        }
      } else if (filteredCountries.length > 10) {
        console.log("please be more specific");
        setResult([]);
        setInfo("please be more specific");
      } else if (
        filteredCountries.length > 0 &&
        filteredCountries.length < 10
      ) {
        setResult(filteredCountries);
        setInfo(null);
        console.log();
      } else {
        setInfo("There are no matches");
        setShowCountry(false);
        setResult(filteredCountries);
      }
    } else {
      setShowCountry(false);
      setResult([]);
    }
  }, [search, countries, location, countryId, isButtonClicked]);

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
        <Weather weather={weather} />
      </div>
    </>
  );
};

export default App;
