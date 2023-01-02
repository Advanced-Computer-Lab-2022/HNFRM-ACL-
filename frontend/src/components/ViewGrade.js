import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GradingIcon from '@mui/icons-material/Grading';

import Header from '../Headers/header'
import Footer from '../Headers/footer';


const { useState, useEffect } = require("react");

const theme = createTheme({
  palette: {
    primary: {
      main: '#800000',
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
  m: 3,
  border: 1,
  width: '50rem',
  height: '30rem',
};

const ViewGradeCorporate = () => { 
    const [grade,setGrade] =useState('');
    const params = new URLSearchParams(window.location.search);
    const examId = params.get('examId');
    useEffect(() => {
      axios.get(`http://localhost:8000/studentAnswers?examId=${examId}`,{
        headers: {"token" :  localStorage.getItem("token")}
      }).then(
      (res) => { 
          const questions = res.data.grade
          setGrade(questions)

      })}) ;
    
    return( 
    <ThemeProvider theme={theme}>
      <Header/>
        <Container sx={{ ml:38}} >
          <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...commonStyles, borderRadius: '16px'
              }}
            >
              <Avatar sx={{ m: 3, bgcolor: 'primary.main' }}>
                <GradingIcon />
              </Avatar>
              <Typography  variant="h5">
                <h2>Your Exam Grade is: {grade}</h2>
              </Typography>
              <Grid>
                <Button
                  variant="contained"
                  onClick ={() => window.location.href=`/viewQuestionAnswers?examId=${examId}`}
                  sx={{ mt: 3, mb: 2 }}
                  >
                 Correct Answers
                </Button>
                
              </Grid>
            </Box>
            
        </Container>
        <Footer/>
      </ThemeProvider>
  )

}
export default ViewGradeCorporate;