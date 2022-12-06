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

const CreateExam = () => {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('courseId');
  const [name, setName] = useState('');
  const [examId, setExamId] = useState('');

  const addExam = async () => {
    let res = await axios.post(`http://localhost:8000/createExam?courseId=${courseId}`,
      {
        name:name
      })
    setExamId(res._id);
    
    console.log(res);
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={3.5}
          sx={{
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
            <Typography component="h1" variant="h5">
              Create Exam
            </Typography>
            <Box component="form" noValidate   onSubmit={addExam} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="exam"
                label="Exam Name"
                name="exam"
                autoFocus
                onChange={e => setName(e.target.value)}
              />
              <br></br>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Add
              </Button>
              <Button
               variant="outlined" 
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={() => window.location.href=`/createQuestion?examId=${examId}`}
                >
                Create Questions
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default CreateExam;