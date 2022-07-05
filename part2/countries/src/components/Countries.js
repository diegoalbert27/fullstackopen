import React from 'react'
import Country from './Country'
import DetailsCountry from './DetailsCountry'

const Countries = ({ countries, showCountry, wheater }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (countries.length === 1) {
    return (
      countries.map((country => <DetailsCountry key={country.name} country={country} wheater={wheater} />))
    )
  }
  
  return (
    <div>
      {
        countries.map(country => <Country key={country.name} country={country} showCountry={showCountry} />)
      }
    </div>
  )
}

export default Countries