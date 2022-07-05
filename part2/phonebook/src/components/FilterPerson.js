import React from 'react'

const FilterPerson = ({ filteringName }) => {
  return (
    <>filter shown with<input onChange={filteringName} /></>
  )
}

export default FilterPerson