import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import PageNotFound from './PageNotFound'

import Header from '../Headers/header';



const theme = createTheme({
  palette: {
    primary: {
      main: '#800000',
      light : '#963129',
      dark: '#963129'
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

const { useState , useEffect} = require("react");

const Check = () =>{

  const [usernameCorporateTrainee, setUsername] = useState('');
  const [passwordCorporateTrainee, setPassword] = useState('');
  const [corporateCompany, setCorporateCompany] = useState('');

    const add = async () => {
        let res = await axios.post('http://localhost:8000/addCorporateTrainee',{username : usernameCorporateTrainee , password : passwordCorporateTrainee , company:corporateCompany})
        console.log(res);
    }

    return (
      <ThemeProvider theme={theme}>
        <Header/>
        <Container>
          <CssBaseline />
          <Grid item sx= {{height:'100%' , width :'100%'}}>
            <Box
              sx={{
                my: 9,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ mt:10, bgcolor: 'primary.main' }}>
              <AddCircleOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h4"  sx={{mt:2}}>
                Add Corporate Trainee
              </Typography>
              <Box component="form" noValidate onSubmit={add} sx={{ mt: 5 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="UserName"
                  name="username"
                  autoComplete=""
                  autoFocus
                  onChange ={e =>setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete=""
                  onChange ={e =>setPassword(e.target.value)}
                />
                <br></br>
                <br></br>
                <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-label" required>Company</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={corporateCompany}
                  onChange ={e =>setCorporateCompany(e.target.value)}
          
                  label="Company"
                >
                  <MenuItem value={"Company 1"}>Company 1</MenuItem>
                  <MenuItem value={"Company 2"}>Company 2</MenuItem>
                  <MenuItem value={"Company 3"}>Company 3</MenuItem>
                  <MenuItem value={"Company 4"}>Company 4</MenuItem>
                </Select>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Grid>
        </Container>
        <br></br>
        <br></br>
        <br></br>
      </ThemeProvider>
    );
}

const AddCorporateTraninee = () => {
  const [type, setType] = useState('');
  useEffect(()=>{
    axios.get('http://localhost:8000/isLogin' ,{
        headers: {
            "token" :  localStorage.getItem("token")
        },
    }).then(
    (res) => { 
        const user = res.data;
        setType(user.type)
        })
    });

    let Add;
    if(type=='Admin'){
      Add =<Check></Check>
    }
    else{
      Add =<PageNotFound></PageNotFound>
    }

    return(
      <Box>
        {Add}
      </Box>
    )

}
export default AddCorporateTraninee;