import { useState, useEffect } from "react";
import APIService from "./services/APIService";
import SearchDiv from "./components/SearchDiv";
import Result from "./components/Result";
import Weather from "./components/Weather";
import ShowCountry from "./components/ShowCountry";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [showCountry, setShowCountry] = useState(false);
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
    ShowCountry(false);
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
              setShowCountry(true);
              setInfo(null);
            })
            .catch((error) => console.log(error.message));
          setResult(filteredCountries);
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
        setShowCountry(false);

        setInfo(null);
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
      <div className="app">
        <div>
          <h1>Country Info</h1>
          <SearchDiv onChange={handleChange} value={search} info={info} />
        </div>
        <div>
          <Result
            result={result}
            showCountry={showCountry}
            location={handleClick}
            weather={weather}
          />
          <Weather weather={weather} />
        </div>
      </div>
    </>
  );
};

export default App;
