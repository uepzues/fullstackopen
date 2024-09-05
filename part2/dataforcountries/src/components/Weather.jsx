import ShowCountry from "./ShowCountry";

const Weather = ({ weather }) => {
  return (
    <div>
      {weather && (
        <div>
          <div>
            <p>{weather.temp}</p>
            <p>{weather.main}</p>
            <p>{weather.description}</p>
            <p>{weather.icon}</p>
            <p>{weather.clouds}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
