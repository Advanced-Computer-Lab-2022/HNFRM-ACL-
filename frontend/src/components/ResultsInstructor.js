import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';



import Header from '../Headers/header'
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

const SearchResultsInst = () => {
    const [courses,setCourses] = useState([]);

    const params = new URLSearchParams(window.location.search);
    const filter = params.get('filter');
    console.log(filter)
  

    useEffect(()=>{
       let x=  axios.get(`http://localhost:8000/searchInstructor?filter=${filter}`,
       {headers: {"token" :  localStorage.getItem("token")}}).then(
        (res) => { 
            const courses = res.data;
            setCourses(courses)
            })
        });


        return(
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header/>
            <Grid item xs={12} sm={8} md={1} elevation={6}>
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

                <Box   noValidate sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',  height: '100%',
            rowGap :8
          }}>  
        
            
            {courses.map((course) =>(
            
            <Grid item sx={{width: '70%',  height: '100%' , ml:9 }}>
            <CardActionArea component="a" >
              <Card sx={{ display: 'flex' , backgroundColor:'#f2eeee'}} onClick={() => window.location.href=`/course?courseId=${course._id}`} >
              <CardContent sx={{ flex: 1 }}>
                <Typography  variant="h3" gutterBottom >
                   {course.title}
                </Typography>
                <Typography variant='h5' sx={{mr:63, mt:3,mb:3 }} color='text.secondary'> 
                Course Details</Typography>
                <Typography variant="h5" paragraph sx={{mr:70}}>
                  {course.credithours} Hours
                </Typography>

                { course.price==0 ? (<Typography variant="h5" paragraph sx={{mr:55}}> Free </Typography>) : <Typography variant="h5" paragraph sx={{mr:60}}> Price : {course.price}  </Typography>
                }
                <Rating  sx={{mr:68}} name="Rating" value={course.rating} readOnly />
              </CardContent>
              <CardMedia
                  component="img"
                  sx={{ width : 160, display: { xs: 'none', lg: 'block' } }}
                  image={require('./Python.png')}
                  alt={"Image Label"}
                />
              </Card>
            </CardActionArea>
           </Grid>
                  
            
            
              ))}  
              </Box>  
                
              
              </Box>
              </Grid>
              <Footer/>
              </ThemeProvider>
    
        )

}
export default SearchResultsInst;