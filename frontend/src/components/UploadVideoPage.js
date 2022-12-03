import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Divider  from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
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

const UploadVideo = () =>{
    const [courseLink, setcourseLink] = useState('');
    const [subtitle1Link, setsubtitle1Link] = useState('');
    const [subtitle2Link, setsubtitle2Link] = useState('');
    const [subtitle3Link, setsubtitle3Link] = useState('');
    const [subtitle4Link, setsubtitle4Link] = useState('');
    const [description1, setdescription1] = useState('');
    const [description2, setdescription2] = useState('');
    const [description3, setdescription3] = useState('');
    const [description4, setdescription4] = useState('');

    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    console.log(courseId);

    const upload = async() =>{
        let res = await axios.patch(`http://localhost:8000/UploadVideo?courseId=${courseId}`,{link : courseLink, subtitleslink :[subtitle1Link,subtitle2Link,subtitle3Link,subtitle4Link],descriptions :[description1,description2,description3,description4]})
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
                my: 2,
                mx: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <AddIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Upload Links
              </Typography>
        <Box component="form" noValidate onSubmit={upload} sx={{ mt: 1 }} md={10}>
        <Grid item xs={12} sm={60}>
              <Typography gutterBottom variant="h6" component="div">
              Course Link
              </Typography>
                <TextField
                  required
                  fullWidth
                  id="uploadLink"
                  label="Upload Link"
                  name="uploadLink"
                  onChange ={e =>setcourseLink(e.target.value)}
                />
              </Grid>
              <br></br>
              <br></br>
              <Divider/>
              <br></br>
          <Grid item xs={12} sm={20}>
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 1 Link
                </Typography>
                <TextField
                  required
                  id="subtitleLink1"
                  label="Subtitle Link"
                  name="subtitleLink1"
                  onChange ={e =>setsubtitle1Link(e.target.value)}
                />
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 1 Link Description
                </Typography>
                <TextField
                  required
                  id="description1"
                  label="Description"
                  name="description1"
                  onChange ={e =>setdescription1(e.target.value)}
                />
                </Grid>
                <br></br>
                <Divider/>
                <br></br>
                <Grid item xs={12} sm={20}>
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 2 Link
                </Typography>
                <TextField
                  required
                  id="subtitleLink2"
                  label="Subtitle Link"
                  name="subtitleLink2"
                  onChange ={e =>setsubtitle2Link(e.target.value)}
                />
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 2 Link Description
                </Typography>
                <TextField
                  
                  id="description2"
                  label="Description"
                  name="description2"
                  onChange ={e =>setdescription2(e.target.value)}
                />
                </Grid>
                <br></br>
                <Divider/>
                <br></br>
                <Grid item xs={12} sm={20}>
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 3 Link
                </Typography>
                <TextField
                  
                  id="subtitleLink3"
                  label="Subtitle Link"
                  name="subtitleLink3"
                  onChange ={e =>setsubtitle3Link(e.target.value)}
                />
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 3 Link Description
                </Typography>
                <TextField
                  
                  id="description3"
                  label="Description"
                  name="description3"
                  onChange ={e =>setdescription3(e.target.value)}
                />
                </Grid>
                <br></br>
                <Divider/>
                <br></br>
                <Grid item xs={12} sm={20}>
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 4 Link
                </Typography>
                <TextField
                  required
                  id="subtitleLink4"
                  label="Subtitle Link"
                  name="subtitleLink4"
                  onChange ={e =>setsubtitle4Link(e.target.value)}
                />
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 4 Link Description
                </Typography>
                <TextField
                  required
                  id="description4"
                  label="Description"
                  name="description4"
                  onChange ={e =>setdescription4(e.target.value)}
                />
                </Grid>
                <Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Upload
                </Button>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
              </Box>
          </Grid>
              </Grid>
      </ThemeProvider>
  
    )
}
export default UploadVideo;