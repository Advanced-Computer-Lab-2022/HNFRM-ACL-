import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Typography ,Container ,Box , Paper, Grid,FormControl,FormLabel,RadioGroup ,Radio,FormControlLabel ,CssBaseline, Button } from "@mui/material";


import Header from '../Headers/header'
import Footer from '../Headers/footer';
import { useState } from 'react';


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

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '70rem',
    height: '29.8rem',
};

export default function Report() {
  const [type,setType] = useState('');
  const [theProblem,setTheProblem] = useState('');
  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')

  const report = async () =>{
    let res = await axios.post(`http://localhost:8000/reportProblem?courseId=${courseId}`,{type:type,theProblem:theProblem},
    { headers: {"token" :  localStorage.getItem("token")} })
    console.log(res);
    window.location.href=`/report?courseId=${courseId}`
    
  }

    return(
        <ThemeProvider theme={theme}>
          <Header/>
            <Container width={'100'} maxHeight sx={{mt:10}}>
            <CssBaseline />
                <Box sx={{ ...commonStyles, borderRadius: '16px' }}> 
                    
                        <Typography variant = 'h4' sx={{mt:4 , mb:1}}>
                            Report Problem with This Course
                        </Typography>
                        <Grid>
                        <FormControl>   
                           <FormLabel id="demo-row-radio-buttons-group-label" variant='h6'>Check if that apply</FormLabel>
                               <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                  value={type}
                                  onChange ={e =>setType(e.target.value)}
                                >
                                <FormControlLabel value="technical" control={<Radio />} label="Technical" />
                                <FormControlLabel value="financial" control={<Radio />} label="Financial" />
                                <FormControlLabel value="others" control={<Radio />} label="Others" />
                                </RadioGroup>
                        </FormControl>
                        </Grid> 
                        <Typography variant='h6' sx={{mt:2 , mb:1}}>
                            What's your problem
                        </Typography> 
                        <TextField 
                        sx={{width:500}}
                        multiline
                        onChange={e=>setTheProblem(e.target.value)}
                        rows={8}>
                        sx={{mt:1 , mb:2}}

                        </TextField>
                        <Grid>
                        <Button
                        onClick={report}
                        sx={{mt:1 , mb:1}}>
                            Submit
                        </Button>
                        </Grid>
                    
                       
                    </Box>
                
            </Container>
            <Footer/>
        </ThemeProvider>

    )
}