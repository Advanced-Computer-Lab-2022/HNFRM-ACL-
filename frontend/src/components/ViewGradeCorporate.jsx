import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import GradeIcon from '@mui/icons-material/Grade';;


const { useState, useEffect } = require("react");

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          HNFRM
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const theme = createTheme();

const ViewGradeCorporate = () => { 
    const params = new URLSearchParams(window.location.search);
    const exam = params.get('exam');
    const corporateTrainee = params.get('corporateTrainee');
    const [grade, setGrade] = useState('')

    useEffect(() => {
      axios.get(`http://localhost:8000/viewGradeCorporate?exam=${exam}&corporateTrainee=${corporateTrainee}`).then(
      (res) => { 
        const grade = res.data
                console.log(grade)
                setGrade(grade)  
      })}
       );

    
    return( <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          
          
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <GradeIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
          <h4>Your Exam Grade is:</h4>
          <h6>{grade.yourgrade}</h6>
              </Typography>
              <Box component="form" noValidate   sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  onClick ={() => window.location.href=`/viewQuestionAnswers?examId=${exam}`}
                  sx={{ mt: 3, mb: 2 }}
                  >
                 Correct Answers
                </Button>
                
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Box>
            
          
          
        </Grid>
      </ThemeProvider>
  )

}
export default ViewGradeCorporate;