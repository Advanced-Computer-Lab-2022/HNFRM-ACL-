import axios from 'axios';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const { useState,useEffect } = require("react");
const theme = createTheme();

const ViewExercises = () => {
    const [exams,setExams] = useState([]);
    const [names,setNames] = useState([]);
    //const [names,setNames] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');


    useEffect(() => {
        axios.get(`http://localhost:8000/viewExams?courseId=${courseId}`).then(
        (res) => { 
            const exams = res.data
            //const name =courses.name
            //const examId =courses._id;
            console.log(exams)
            setExams(exams)
            //setNames(name)
            
        })}
         );

         return(
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5">
                  List of Exercies
                </Typography>
                {exams.map((exam) =>(
                    <CardActionArea component="a" href="#">
                    <Card sx={{ display: 'flex' }} onClick={() => window.location.href=`/viewQuestion?examId=${exam._id}`}>
                      <CardContent sx={{ flex: 1 }}>
                        <Typography  variant="h5" gutterBottom>
                          {exam.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </CardActionArea>
                 ))};
              </Grid>
            </Grid>   

            <Copyright sx={{ mt: 5 }} />
  </Container>
 </ThemeProvider>
         )
    }
export default ViewExercises;