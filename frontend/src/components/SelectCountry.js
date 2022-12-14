import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Box from '@mui/material/Box';

function CountrySelector() {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }

  return (
    <Box sx={{ my: 1, mx: 1 }}>
  <Select options={options} value={value} onChange={changeHandler} />
  </Box>
  )
}

export default CountrySelector