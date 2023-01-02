import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { BsFillEyeSlashFill } from "react-icons/bs";

import Header from '../Headers/header';
import Footer from '../Headers/footer';


const { useState,useEffect } = require("react");

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

const ViewProblems = () => {
    const [problems,setProblems] = useState([]);
    const [status, setStatus] = useState('');
    const [id, setId] = useState('');

    const handleRes = (event) => {
       setStatus('resolved')
    };

    const handlePen = (event) => {
        setStatus('pending')
    };

    useEffect(() => {
        axios.get('http://localhost:8000/reportedProblems').then(
        (res) => { 
            const problems = res.data
            console.log(problems)
            setProblems(problems)
            
        })}
         );

     const solve = async () => {
      await axios.patch(`http://localhost:8000/solveProblem`,
      {problem:id,status:status})
    }     
        return(
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header/>
            <Grid item xs={12} sm={8} md={1} elevation={6} square>
            <Box
              sx={{
                my: 2,
                mx: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
                <br></br>
                <Box noValidate sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                width: '100%',  height: '100%'
            }}>
                </Box>
            <br></br>
            
            {problems.map((problem) =>(
                <Paper
                sx={{
                  p: 7,
                  margin: 'auto',
                  width: 640,
                  flexGrow: 1,
                  bgcolor:'#f2eeee'
                    
                }}
              style = {{marginLeft:-2}}
              onClick ={e =>setId(problem._id)}
              >
                <Grid container spacing={2} sx={{rowGap :8}}>
                    
                  <Grid item >
                    
                  <Avatar sx={{ mt: 1,width: 56, height: 56, bgcolor: 'primary.main' }}>
                   <ReportProblemIcon />
                   </Avatar>
                  </Grid>
                  <Grid item xs={12} sm container >
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item>
                        <Typography gutterBottom variant="h4" component="div" sx={{mr:12}}>
                        {problem.type}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{mr:19}}>
                          {problem.theProblem}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{mr:19}}>
                          {problem.followUp}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item >
                    
                    <FormGroup
                        
                        >
                      <FormControlLabel value="resolved" control={<Checkbox 
                      onChange = {handleRes}
                       />} label="Resolved" />
                      <FormControlLabel value="pending" control={<Checkbox 
                      onChange ={handlePen}
                      />} label="Pending" />
                    </FormGroup>
                    <Button
                    onClick={solve}>
                      Submit
                    </Button>
                    
                    </Grid>
                    
                  </Grid>
                  
                </Grid>
                <BsFillEyeSlashFill color = "#721616" style={{marginLeft:530}} size={17} />
                
              </Paper>
                ))}  
                
              
              </Box>
              </Grid>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Footer/>
              </ThemeProvider>
    
        )

}
export default ViewProblems;