import React from 'react'

const Country = ({ country, showCountry }) => {
  return (
    <div>
      {country.name}<button onClick={() => showCountry(country.name)}>show</button>
    </div>
  )
}

export default Country