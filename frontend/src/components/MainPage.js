import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Rating from '@mui/material/Rating';
import CssBaseline from '@mui/material/CssBaseline';


import Header from '../Headers/header';
import Footer from '../Headers/footer';


const { useState,useEffect } = require("react");


const theme = createTheme({
    palette: {
      primary: {
        main: '#800000',
        light : '#800000',
        dark: '#800000'
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

const PageAdmin = () => {
  return (
    <ThemeProvider theme={theme}>
         <Header/>
      
        <CssBaseline />
        
          <Box
          sx={{
            position: 'relative',
            backgroundColor: 'primary.main',
            color: 'White',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${require('./About.jpeg')})`,
            
         }}>
          <br></br>
          <Typography variant="h3" sx={{mt:35 , mr:85}}>
              With HNFRM
            </Typography>
            <Typography variant="h3" sx={{mt:2 , mr:48}}>
               Change the world. Educate
            </Typography>
            <Typography variant="h5" sx={{mt:2 , mr:20}}>
               CHOOSE FROM THE OFFERED COURSES TO IMPROVE YOUR SKILLS
            </Typography>
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
  

          </Box>
    </ThemeProvider>
  
  );     
}

const PageHome = () => { 
  const [courses,setCourses] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/enrolled').then(
    (res) => { 
        const courses = res.data
        setCourses(courses)
        
    })}
     );
  
  return (
    <ThemeProvider theme={theme}>
         <Header/>
      
        <CssBaseline />
        
          <Box
          sx={{
            position: 'relative',
            backgroundColor: 'primary.main',
            color: 'White',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${require('./Welcome.jpg')})`,
            
         }}>
          <br></br>
          <Typography variant="h2" sx={{mt:14 , mr:125}}>
              With HNFRM
            </Typography>
            <Typography variant="h3" sx={{mt:2 , mr:96}}>
               Change the world. Educate
            </Typography>
            <Typography variant="h5" sx={{mt:2 , mr:68}}>
               CHOOSE FROM THE OFFERED COURSES TO IMPROVE YOUR SKILLS
            </Typography>
            <br></br>
            <br></br>
            <br></br>

          </Box>
        <Box
          sx={{
            marginTop: 8,
            marginLeft: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
            
          <Typography component="h1" variant="h3" sx={{ml:10}}>
            Our Most Popular Courses
          </Typography>
          
          <br></br>
          <Typography component="h3" variant="h5" sx={{ml:11}}>
            over 5000+ courses available to you
          </Typography>
          <br></br>
          <Box   noValidate sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            width: '100%',  height: '100%'
          }}>
            
            {courses.map((course) =>(
              <Grid container spacing={2}>
              <Grid item sx={{width: '90%',  height: '100%' , ml:9}}>
              <CardActionArea component="a" >
                <Card sx={{ display: 'flex' , backgroundColor:'#f2eeee' }} onClick={() => window.location.href=`/course?courseId=${course._id}`} >
                <CardContent sx={{ flex: 1 }}>
                  <Typography  variant="h5" gutterBottom sx={{mr:40}}>
                     {course.title}
                  </Typography>
                  <Typography variant="h5" paragraph sx={{mr:40}}>
                    {course.credithours} Hours
                  </Typography>
                  <Typography variant="h5" paragraph sx={{mr:40}}>
                   Price: {course.price} 
                  </Typography>
                  <Rating  sx={{mr:40}} name="Rating" value={course.rating} readOnly />
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
             </Grid>
            ))}
          
        
              
            
          </Box>
          <Button
          sx={{ml:9}}
          onClick ={() => window.location.href=`/courses`}>
             View All Courses
          </Button>
        </Box>


        <Box
          sx={{
            marginTop: 10,
            marginLeft: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
            
          <Typography component="h1" variant="h3"  sx={{ml:9}}>
            Compaines
          </Typography>

          <Typography component="h3" variant="h5"  sx={{mt:2,ml:9}}>
             Partnership with over 100 multinational companies
          </Typography>
          <br></br>
          </Box>
          <br></br> 
          <Box
          sx={{
            position: 'relative',
            backgroundColor: 'primary.main',
            color: 'white',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${require('./Companies.jpg')})`
         }}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
         </Box>

         <Box
          sx={{
            marginTop: 8,
            marginLeft: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant='h3' sx={{ml:9}}>
            Instructor of the month
          </Typography>
          </Box>
          <Grid item sx = {{width: '50%',  height: '80%',mt:2, ml:9}}>
                <CardActionArea component="a" >
                  <Card sx={{ display: 'flex' , backgroundColor:'#f2eeee'}} >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography  variant="h3" gutterBottom>
                      Haneen Gamal
                    </Typography>
                    <Rating  name="Rating" value={5} readOnly />
                    <Typography variant="h5" paragraph>
                     Highest rated Instructor
                    </Typography>
                    <Typography variant="h5" paragraph>
                     Number of Courses : 7
                    </Typography>
                  </CardContent>
                  <CardMedia
                      component="img"
                      sx={{ width : 160, display: { xs: 'none', sm: 'block' } }}
                      image={require('./FrontendQueen.jpeg')}
                      alt={"Image Label"}
                    />
                  </Card>
                </CardActionArea>
               </Grid>
               <br></br>
      <br></br>
      <br></br>
      <br></br>

        <Box
          sx={{
            position: 'relative',
            backgroundColor: 'primary.main',
            color: 'white',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${require('./About.jpeg')})`
         }}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Typography variant='h4'>
            About HNFRM

          </Typography>

          <Typography variant='subtitle'>
          HNFRM was launched in 2022 by five GUC undergraduate students, Haneen Gamal , Noussa Ameer , Farah Fouad , Rania Saleh and Mohab El-Ansary, 
with a mission to provide universal access to world-class learning. It is now one of the largest online learning platforms in the world, 
with 113 million registered learners as of September 30, 2022. HNFRM partners with over 275 leading university and industry partners to offer a broad catalog of content and credentials, 
including Guided Projects, courses, Specializations, certificates, and bachelor’s and master’s degrees. Institutions around the world use HNFRM to upskill and reskill their employees, citizens, 
and students in many high-demand fields, including data science, technology, and business. 
            
          </Typography>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
         </Box>
        
        
      <br></br>
      <br></br>
      <br></br>
      <Footer/>
    </ThemeProvider>
  );
    
   
}


const Cor = () =>{
  const [courses,setCourses] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/enrolled').then(
    (res) => { 
        const courses = res.data
        setCourses(courses)
        
    })}
     );
  
  return (
    <ThemeProvider theme={theme}>
         <Header/>
      
        <CssBaseline />
        
          <Box
          sx={{
            position: 'relative',
            backgroundColor: 'primary.main',
            color: 'White',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${require('./Welcome.jpg')})`,
            
         }}>
          <br></br>
          <Typography variant="h2" sx={{mt:14 , mr:125}}>
              With HNFRM
            </Typography>
            <Typography variant="h3" sx={{mt:2 , mr:96}}>
               Change the world. Educate
            </Typography>
            <Typography variant="h5" sx={{mt:2 , mr:68}}>
               CHOOSE FROM THE OFFERED COURSES TO IMPROVE YOUR SKILLS
            </Typography>
            <br></br>
            <br></br>
            <br></br>

          </Box>
        <Box
          sx={{
            marginTop: 8,
            marginLeft: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
            
          <Typography component="h1" variant="h3" sx={{ml:10}}>
            Our Most Popular Courses
          </Typography>
          
          <br></br>
          <Typography component="h3" variant="h5" sx={{ml:11}}>
            over 5000+ courses available to you
          </Typography>
          <br></br>
          <Box   noValidate sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            width: '100%',  height: '100%'
          }}>
            
            {courses.map((course) =>(
              <Grid container spacing={2}>
              <Grid item sx={{width: '90%',  height: '100%' , ml:9}}>
              <CardActionArea component="a" >
                <Card sx={{ display: 'flex' , backgroundColor:'#f2eeee' }} onClick={() => window.location.href=`/course?courseId=${course._id}`} >
                <CardContent sx={{ flex: 1 }}>
                  <Typography  variant="h5" gutterBottom sx={{mr:40}}>
                     {course.title}
                  </Typography>
                  <Typography variant="h5" paragraph sx={{mr:40}}>
                    {course.credithours} Hours
                  </Typography>
                  <Rating  sx={{mr:40}} name="Rating" value={course.rating} readOnly />
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
             </Grid>
            ))}
          
        
              
            
          </Box>
          <Button
          sx={{ml:9}}
          onClick ={() => window.location.href=`/courses`}>
             View All Courses
          </Button>
        </Box>


        <Box
          sx={{
            marginTop: 10,
            marginLeft: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
            
          <Typography component="h1" variant="h3"  sx={{ml:9}}>
            Compaines
          </Typography>

          <Typography component="h3" variant="h5"  sx={{mt:2,ml:9}}>
             Partnership with over 100 multinational companies
          </Typography>
          <br></br>
          </Box>
          <br></br> 
          <Box
          sx={{
            position: 'relative',
            backgroundColor: 'primary.main',
            color: 'white',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${require('./Companies.jpg')})`
         }}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
         </Box>

         <Box
          sx={{
            marginTop: 8,
            marginLeft: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant='h3' sx={{ml:9}}>
            Instructor of the month
          </Typography>
          </Box>
          <Grid item sx = {{width: '50%',  height: '80%',mt:2, ml:9}}>
                <CardActionArea component="a" >
                  <Card sx={{ display: 'flex' , backgroundColor:'#f2eeee'}} >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography  variant="h3" gutterBottom>
                      Haneen Gamal
                    </Typography>
                    <Rating  name="Rating" value={5} readOnly />
                    <Typography variant="h5" paragraph>
                     Highest rated Instructor
                    </Typography>
                    <Typography variant="h5" paragraph>
                     Number of Courses : 7
                    </Typography>
                  </CardContent>
                  <CardMedia
                      component="img"
                      sx={{ width : 160, display: { xs: 'none', sm: 'block' } }}
                      image={require('./FrontendQueen.jpeg')}
                      alt={"Image Label"}
                    />
                  </Card>
                </CardActionArea>
               </Grid>
               <br></br>
      <br></br>
      <br></br>
      <br></br>

        <Box
          sx={{
            position: 'relative',
            backgroundColor: 'primary.main',
            color: 'white',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${require('./About.jpeg')})`
         }}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Typography variant='h4'>
            About HNFRM

          </Typography>

          <Typography variant='subtitle'>
          HNFRM was launched in 2022 by five GUC undergraduate students, Haneen Gamal , Noussa Ameer , Farah Fouad , Rania Saleh and Mohab El-Ansary, 
with a mission to provide universal access to world-class learning. It is now one of the largest online learning platforms in the world, 
with 113 million registered learners as of September 30, 2022. HNFRM partners with over 275 leading university and industry partners to offer a broad catalog of content and credentials, 
including Guided Projects, courses, Specializations, certificates, and bachelor’s and master’s degrees. Institutions around the world use HNFRM to upskill and reskill their employees, citizens, 
and students in many high-demand fields, including data science, technology, and business. 
            
          </Typography>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
         </Box>
        
        
      <br></br>
      <br></br>
      <br></br>
      <Footer/>
    </ThemeProvider>
  );

}


const MainPage = () =>{
  const [type, setType] = useState('');


  useEffect(()=>{
      axios.get('http://localhost:8000/isLogin' ,{
          headers: {
              "token" :  localStorage.getItem("token")
          },
      }).then(
      (res) => { 
          setType(res.data.type)
          
          })    
      } ) ;

  let view;
  if(type == 'Admin'){
     view =<PageAdmin/>
  } 
  else if(type=='Corporate Trainee'){
    
    view =<Cor/>
  }
  else{
    view=<PageHome></PageHome>
  }

  return(
    <ThemeProvider theme={theme}>
    <Box>
    {view}
    </Box>
    </ThemeProvider>
  )
}
export default MainPage;