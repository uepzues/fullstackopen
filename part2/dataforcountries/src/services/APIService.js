import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather/";
const API_KEY = import.meta.env.VITE_API_KEY;

export const getCountries = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error.message));
};

export const getWeather = (capital) => {
  return axios
    .get(`${weatherUrl}?q=${"Nicosia"}&appid=${API_KEY}&units=metric`)
    .catch((error) => console.log(error.message));
};

export default {
  getCountries,
  getWeather,
};
