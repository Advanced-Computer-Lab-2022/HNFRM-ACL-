import axios from 'axios';
import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import iso from 'iso-country-currency'

function CountrySelector() {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])


  const changePrice = async (value) => {
    let bla = iso.getParamByISO(value, 'currency')
    await axios.patch('http://localhost:8000/change',{change : bla })
    console.log(value)
  }

  const changeHandler = value => {
    setValue(value)
    changePrice(value.value)
  }

  return <Select options={options} value={value} onChange={changeHandler} />
}

export default CountrySelector

