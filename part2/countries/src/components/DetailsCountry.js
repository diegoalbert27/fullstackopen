import React from 'react'

const DetailsCountry = ({ country, wheater }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {
          country.languages.map(language => <li key={language.name}>{language.name}</li>)
        }
      </ul>
      <img src={country.flag} alt={`${country.name} flag`} width='100px' height='100px' />
      <h3>Wheater in {country.capital}</h3>
      <b>temperature: </b>{wheater.current?.temperature} Celcius
      <br/>
      <img src={wheater.current?.weather_icons.join('')} alt={'Temperature icon'} />
      <br/>
      <b>wind: </b>{wheater.current?.wind_speed} mph direction {wheater.current?.wind_dir}
    </div>
  )
}

export default DetailsCountry