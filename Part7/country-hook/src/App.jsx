import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    const getCountries = async () => {
      const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
      const response = await axios.get(baseUrl)
      const countryData = await response.data.find((country) =>
        country.name.common.toLowerCase().includes(name.toLowerCase())
      )
      console.log(countryData)

      if (countryData) {
        setCountry({ found: true, data: countryData })
      } else {
        setCountry({ found: false })
      }
    }
    getCountries()
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.svg}
        height='100'
        alt={`flag of ${country.data.name.official}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
