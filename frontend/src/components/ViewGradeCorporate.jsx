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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const { useState } = require("react");

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
    const viewGradeCorporate=  async () => {
        await axios.get(`http://localhost:8000/viewGradeCorporate?exam=${exam}&corporateTrainee=${corporateTrainee}`).then(
            (res) => { 
                const grade = res.data
                console.log(grade)
                setGrade(grade)  
            }
             );    

    }

    
    return( <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={3.5}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                <AddCircleOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
          <h1>YOUR EXAM GRADE IS:</h1>
          <h1>{grade.yourgrade}</h1>
              </Typography>
              <Box component="form" noValidate   sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  onClick={viewGradeCorporate}
                  sx={{ mt: 3, mb: 2 }}
                  >
                 Load Grade
                </Button>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
  )

}
export default ViewGradeCorporate;