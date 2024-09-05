import ShowCountry from "./ShowCountry";

const Weather = ({ weather, showWeather }) => {
    const weatherIconURL = 'https://openweathermap.org/img/wn/10d@2x.png '
  return (
    <div className="weather">
      {showWeather && (
        <div>
            <h2>Weather</h2>
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} alt="weather icon" />
            <p>Temperature : {weather.temp}</p>
            <p>{weather.main}</p>
            <p>Description: {weather.description}</p>
            
        </div>
      )}
    </div>
  );
};

export default Weather;
