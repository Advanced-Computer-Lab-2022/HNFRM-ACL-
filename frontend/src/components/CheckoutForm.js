import axios from 'axios';
import React from "react";
import "react-credit-card-component/dist/styles-compiled.css";
import Cards from 'react-credit-cards';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Header from '../Headers/header'
import Footer from '../Headers/footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#800000',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#d32f2f',
      main: '#ef5350',
      contrastText: '#ffcc00',
    },
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

let params= new URLSearchParams(window.location.search)
let courseId = params.get('courseId')
console.log(courseId)

let pay = async () => {
  let res = await axios.patch(`http://localhost:8000/pay?courseId=${courseId}`)
  console.log(res);


  register();
}

let register = async () =>{
  console.log(localStorage.getItem("token"))
  let res = await axios.patch(`http://localhost:8000/register?courseId=${courseId}`,{},
  { headers: {"token" :  localStorage.getItem("token")} } )
  
  console.log(res);
  window.location.href=`/course?courseId=${courseId}`

  
}
 
export default  class PaymentForm extends React.Component {

  
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };
 
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }

  

  
  
  render() {
    return (
      <ThemeProvider theme={theme}>
      <Box>
      <Header/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <br></br>
        <div>
        <form>
        	<input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            type="name"
            name="name"
            placeholder="name"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <br></br>
          <input
            type="expiry"
            name="expiry"
            placeholder="Valid thru"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            type="cvc"
            name="cvc"
            placeholder="CVC"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
        </form>
        </div>
        <br></br>
        <Button variant="contained"
        onClick={pay}>
          Submit
        </Button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer/>
      </Box>
      </ThemeProvider>
    );
  }
}