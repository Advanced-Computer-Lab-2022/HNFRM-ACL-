import axios from 'axios';
import ReactPlayer from 'react-player'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { withStyles } from "@mui/material/styles";
const { useState,useEffect } = require("react");




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
  const theme = createTheme();

  const ViewVideo = () => {
    const [subtitleLink, setsubtitleLink] = useState('');
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const subtitle = params.get('subtitle');
    useEffect(() => {
        axios.get(`http://localhost:8000/viewVideo?courseId=${courseId}&subtitle=${subtitle}`).then(
        (res) => { 
            const subtitleLink = res.data
            console.log(subtitleLink)
            setsubtitleLink(subtitleLink)
            
        })}
         );
    return(
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={2}
            md={3}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <Grid item xs={6} sm={6} elevation={12} square>
            
            <Box
              sx={{
                my: 3,
                mx: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
                
        <div className='wrapper'>
                  
            <div className='youtube-box'>
                <ReactPlayer url={subtitleLink} className='video' controls/>
            </div>

        </div>
        
        </Box>
        </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
      </ThemeProvider>
    )
  } 
  export default ViewVideo;