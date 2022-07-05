import React from 'react'

const FindCountry = ({ findedCountry, search }) => {
  return (
    <>find countries<input onChange={findedCountry} value={search} /></>
  )
}

export default FindCountry