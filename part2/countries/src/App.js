import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import FindCountry from './components/FindCountry'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [newFind, setNewFind] = useState('')
  const [findedCountries, setFindedCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [wheater, setWheater] = useState(null)

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all')
      .then(res => {
        const { data } = res
        setCountries(data)
      })
  }, [])

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const api_climate = `http://api.weatherstack.com/current`
    const params = { access_key: api_key, query: country?.capital }
    axios.get(api_climate, { params })
      .then(res => {
        setWheater({...res.data})
      })
  }, [country])

  const findedName = (e) => {
    const name = e.target.value
    const findedCountries = countries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    setNewFind(name)
    setFindedCountries([...findedCountries])

    if (findedCountries.length === 1) {
      setCountry({...findedCountries[0]})
    }
  }

  const showCountry = (name) => {
    setNewFind(name)
    const country = countries.find(country => country.name === name)
    setFindedCountries([{...country}])
    setCountry({...country})
  }

  return (
    <div>
      <FindCountry findedCountry={findedName} search={newFind} />
      {
        newFind === '' ? '' : <Countries countries={findedCountries} showCountry={showCountry} wheater={wheater} />
      }
    </div>
  )
}

export default App
