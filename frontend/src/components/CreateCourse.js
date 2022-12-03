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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


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


const { useState } = require("react");

const CreateCourse = () => {
    const [titleCourse, setTitle] = useState('');
    const [subtitle1Course, setSubtitles1] = useState('');
    const [subtitle2Course, setSubtitles2] = useState('');
    const [subtitle3Course, setSubtitles3] = useState('');
    const [subtitle4Course, setSubtitles4] = useState('');
    const [priceCourse, setPrice] = useState('');
    const [summaryCourse, setSummary] = useState('');
    const [subjectCourse, setSubject] = useState('');

    const add = async () => {
        let res = await axios.post('http://localhost:8000/createCourse',
        {title :titleCourse , subtitles : [subtitle1Course,subtitle2Course,subtitle3Course,subtitle4Course] , 
            price : priceCourse ,summary : summaryCourse , subject:subjectCourse})
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
            md={7}
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AddCircleOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add courses
              </Typography>
              <Box component="form" noValidate onSubmit={add} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete=""
                  autoFocus
                  onChange ={e =>setTitle(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  name="subtitles1"
                  label="Subtitle 1"
                  id="subtitles1"
                  sx ={{right :10}}
                  autoComplete=""
                  onChange ={e =>setSubtitles1(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  name="subtitles2"
                  label="Subtitle 2"
                  id="subtitles2"
                  sx ={{left :10}}
                  autoComplete=""
                  onChange ={e =>setSubtitles2(e.target.value)}
                />
                <br></br>
                <TextField
                  margin="normal"
                  required
                  name="subtitles3"
                  label="Subtitle 3"
                  id="subtitles3"
                  autoComplete=""
                  sx ={{right :10}}
                  onChange ={e =>setSubtitles3(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  name="subtitles4"
                  label="Subtitle 4"
                  id="subtitles4"
                  autoComplete=""
                  sx ={{left :10}}
                  onChange ={e =>setSubtitles4(e.target.value)}
                />
                <br></br>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  name="price"
                  label="Price"
                  id="price"
                  autoComplete=""
                  onChange ={e =>setPrice(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="summary"
                  label="Summary"
                  id="summary"
                  autoComplete=""
                  onChange ={e =>setSummary(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="subject"
                  label="Subject"
                  id="subject"
                  autoComplete=""
                  onChange ={e =>setSubject(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create
                </Button>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
}
export default CreateCourse;
