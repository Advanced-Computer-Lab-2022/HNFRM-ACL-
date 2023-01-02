import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

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

const Normal= () => {

  const [courses,setCourses] = useState([]);
  const [price,setPrice] = useState('');
  const [subject,setSubject] = useState('');
  const [rating,setRating] = useState('');

  


  useEffect(() => {
      axios.get('http://localhost:8000/courses').then(
      (res) => { 
          const courses = res.data

          setCourses(courses)
          
      })}
       );
      return(
        
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header></Header>
          <Grid item xs={12} sm={8} md={1} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
              <br></br>
              <Box noValidate sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',  height: '100%',
              ml:18
            }}
            >
              <FormControl variant="filled" sx ={{width:"22%" , mr : 4}}>
              <InputLabel id="demo-simple-select-label" >Subject</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={subject}
                onChange ={e =>setSubject(e.target.value)}
                label="Subject"
              >
                <MenuItem value={"Arts and Humanities"}>Arts and Humanities</MenuItem>
                <MenuItem value={"Data Science"}>Data Science</MenuItem>
                <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
                <MenuItem value={"Language Learning"}>Language Learning</MenuItem>
                <MenuItem value={"Physical Science and Engineering"}>Physical Science and Engineering</MenuItem>
                <MenuItem value={"Health"}>Health</MenuItem>
                <MenuItem value={"Math and Logic"}>Math and Logic</MenuItem>
                <MenuItem value={"Social Sciences"}>Social Sciences</MenuItem>
                <MenuItem value={"Business"}>Business</MenuItem>
                <MenuItem value={"Information Technology"}>Information Technology</MenuItem>
                <MenuItem value={"Personal Development"}>Personal Development</MenuItem>
              </Select>
              </FormControl>


              <FormControl variant="filled" sx ={{width:"9%" , mr:4}}>
              <InputLabel id="demo-simple-select-label" >Rating</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={rating}
                onChange ={e =>setRating(e.target.value)}
                label="Rating"
              >
                <MenuItem value={"0"}>0</MenuItem>
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"1.1"}>1.1</MenuItem>
                <MenuItem value={"1.2"}>1.2</MenuItem>
                <MenuItem value={"1.3"}>1.3</MenuItem>
                <MenuItem value={"1.4"}>1.4</MenuItem>
                <MenuItem value={"1.5"}>1.5</MenuItem>
                <MenuItem value={"1.6"}>1.6</MenuItem>
                <MenuItem value={"1.7"}>1.7</MenuItem>
                <MenuItem value={"1.8"}>1.8</MenuItem>
                <MenuItem value={"1.9"}>1.9</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"2.1"}>2.1</MenuItem>
                <MenuItem value={"2.2"}>2.2</MenuItem>
                <MenuItem value={"2.3"}>2.3</MenuItem>
                <MenuItem value={"2.4"}>2.4</MenuItem>
                <MenuItem value={"2.5"}>2.5</MenuItem>
                <MenuItem value={"2.6"}>2.6</MenuItem>
                <MenuItem value={"2.7"}>2.7</MenuItem>
                <MenuItem value={"2.8"}>2.8</MenuItem>
                <MenuItem value={"2.9"}>2.9</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"3.1"}>3.1</MenuItem>
                <MenuItem value={"3.2"}>3.2</MenuItem>
                <MenuItem value={"3.3"}>3.3</MenuItem>
                <MenuItem value={"3.4"}>3.4</MenuItem>
                <MenuItem value={"3.5"}>3.5</MenuItem>
                <MenuItem value={"3.6"}>3.6</MenuItem>
                <MenuItem value={"3.7"}>3.7</MenuItem>
                <MenuItem value={"3.8"}>3.8</MenuItem>
                <MenuItem value={"3.9"}>3.9</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"4.1"}>4.1</MenuItem>
                <MenuItem value={"4.2"}>4.2</MenuItem>
                <MenuItem value={"4.3"}>4.3</MenuItem>
                <MenuItem value={"4.4"}>4.4</MenuItem>
                <MenuItem value={"4.5"}>4.5</MenuItem>
                <MenuItem value={"4.6"}>4.6</MenuItem>
                <MenuItem value={"4.7"}>4.7</MenuItem>
                <MenuItem value={"4.8"}>4.8</MenuItem>
                <MenuItem value={"4.9"}>4.9</MenuItem>
                <MenuItem value={"5"}>5</MenuItem>
              </Select>
              </FormControl>
              <Grid item sx={{ mt:2 ,width: 300 }}>
                <Typography variant='body2' color='text.secondary'>
                  Price
                </Typography>
              <Slider
                aria-label="Price"
                defaultValue={0}
                label='Price'
                valueLabelDisplay="auto"
                step={500}
                marks
                min={0}
                max={7000}
                onChange ={e =>setPrice(e.target.value)}
              />
              </Grid>
              <Button sx={{mt:3 , ml:5}} onClick={() => window.location.href=`/filterResults?subject=${subject}&price=${price}&rating=${rating}`} >
                Filter
              </Button>
              </Box>
          <br></br>

          <Box   noValidate sx={{
            marginTop: 1,
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
              
              <br></br>
            </Box>
            </Grid>
            <Footer></Footer>
            </ThemeProvider>
  
      )
}

const Indi = () =>{
  const [courses,setCourses] = useState([])
  const [subject,setSubject] = useState('')
  const [rating,setRating] = useState('')
  const [price,setPrice] = useState('');


  useEffect(() => {
      axios.get('http://localhost:8000/courses').then(
      (res) => { 
          const courses = res.data

          setCourses(courses)
          
      })}
       );
      return(
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header></Header>
          <Grid item xs={12} sm={8} md={1} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
              <br></br>
              <Box noValidate sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',  height: '100%'
  }}
  >
              <FormControl variant="filled" sx ={{width:"22%" , mr : 4}}>
              <InputLabel id="demo-simple-select-label" >Subject</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={subject}
                onChange ={e =>setSubject(e.target.value)}
                label="Subject"
              >
                <MenuItem value={"Arts and Humanities"}>Arts and Humanities</MenuItem>
                <MenuItem value={"Data Science"}>Data Science</MenuItem>
                <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
                <MenuItem value={"Language Learning"}>Language Learning</MenuItem>
                <MenuItem value={"Physical Science and Engineering"}>Physical Science and Engineering</MenuItem>
                <MenuItem value={"Health"}>Health</MenuItem>
                <MenuItem value={"Math and Logic"}>Math and Logic</MenuItem>
                <MenuItem value={"Social Sciences"}>Social Sciences</MenuItem>
                <MenuItem value={"Business"}>Business</MenuItem>
                <MenuItem value={"Information Technology"}>Information Technology</MenuItem>
                <MenuItem value={"Personal Development"}>Personal Development</MenuItem>
              </Select>
              </FormControl>


              <FormControl variant="filled" sx ={{width:"9%" , mr:4}}>
              <InputLabel id="demo-simple-select-label" >Rating</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={rating}
                onChange ={e =>setRating(e.target.value)}
                label="Rating"
              >
                <MenuItem value={"0"}>0</MenuItem>
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"1.1"}>1.1</MenuItem>
                <MenuItem value={"1.2"}>1.2</MenuItem>
                <MenuItem value={"1.3"}>1.3</MenuItem>
                <MenuItem value={"1.4"}>1.4</MenuItem>
                <MenuItem value={"1.5"}>1.5</MenuItem>
                <MenuItem value={"1.6"}>1.6</MenuItem>
                <MenuItem value={"1.7"}>1.7</MenuItem>
                <MenuItem value={"1.8"}>1.8</MenuItem>
                <MenuItem value={"1.9"}>1.9</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"2.1"}>2.1</MenuItem>
                <MenuItem value={"2.2"}>2.2</MenuItem>
                <MenuItem value={"2.3"}>2.3</MenuItem>
                <MenuItem value={"2.4"}>2.4</MenuItem>
                <MenuItem value={"2.5"}>2.5</MenuItem>
                <MenuItem value={"2.6"}>2.6</MenuItem>
                <MenuItem value={"2.7"}>2.7</MenuItem>
                <MenuItem value={"2.8"}>2.8</MenuItem>
                <MenuItem value={"2.9"}>2.9</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"3.1"}>3.1</MenuItem>
                <MenuItem value={"3.2"}>3.2</MenuItem>
                <MenuItem value={"3.3"}>3.3</MenuItem>
                <MenuItem value={"3.4"}>3.4</MenuItem>
                <MenuItem value={"3.5"}>3.5</MenuItem>
                <MenuItem value={"3.6"}>3.6</MenuItem>
                <MenuItem value={"3.7"}>3.7</MenuItem>
                <MenuItem value={"3.8"}>3.8</MenuItem>
                <MenuItem value={"3.9"}>3.9</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"4.1"}>4.1</MenuItem>
                <MenuItem value={"4.2"}>4.2</MenuItem>
                <MenuItem value={"4.3"}>4.3</MenuItem>
                <MenuItem value={"4.4"}>4.4</MenuItem>
                <MenuItem value={"4.5"}>4.5</MenuItem>
                <MenuItem value={"4.6"}>4.6</MenuItem>
                <MenuItem value={"4.7"}>4.7</MenuItem>
                <MenuItem value={"4.8"}>4.8</MenuItem>
                <MenuItem value={"4.9"}>4.9</MenuItem>
                <MenuItem value={"5"}>5</MenuItem>
              </Select>
              </FormControl>
              <Button sx={{mt:2}} onClick={() => window.location.href=`/filterResults?subject=${subject}&price=${price}&rating=${rating}`} >
                Filter
              </Button>
              </Box>
          <br></br>
          
          <Box   noValidate sx={{
            marginTop: 1,
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
                <Typography  variant="h5" gutterBottom >
                   {course.title}
                </Typography>
                <Typography variant='h5' sx={{mr:63, mt:3,mb:3 }} color='text.secondary'> 
                Course Details</Typography>
                <Typography variant="h5" paragraph sx={{mr:70}}>
                  {course.credithours} Hours
                </Typography>
                <Rating  sx={{mr:88}} name="Rating" value={course.rating} readOnly />
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
              
              <br></br>
            </Box>
            </Grid>
            <Footer></Footer>
            </ThemeProvider>
  
      )
}
const ViewCourses = () => {
   const [type, setType] = useState('')

   console.log(localStorage.getItem("token"));


   useEffect(()=>{
       axios.get('http://localhost:8000/isLogin' ,{
           headers: {
               "token" :  localStorage.getItem("token")
           },
       }).then(
       (res) => { 
           const user = res.data;
           setType(user.type)
           })
       });

   let body;     

   if(type == 'Corporate Trainee'){
       body =<Indi></Indi>
   }
   else {
       body = <Normal></Normal>
   }
   return(
       <Box>
       {body}
       </Box>
   )   

}
export default ViewCourses;