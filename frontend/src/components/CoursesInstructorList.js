import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { styled, alpha ,useTheme ,createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase'

import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

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


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const InstructorView = () =>{
  const [courses,setCourses] = useState([])
  const [filter,setFilter] = useState('')
  const [price,setPrice] = useState('');
  const [subject,setSubject] = useState('');



  useEffect(() => {
      axios.get('http://localhost:8000/myCourses', {
        headers: {"token" :  localStorage.getItem("token")}
      }).then(
      (res) => { 

          setCourses(res.data)
          console.log(res.data)
          
      })}
       );
      return(
        
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
              <Search 
              sx={{mt:2}}
           onChange ={e =>setFilter(e.target.value)}
           onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    window.location.href=`/instructorresults?filter=${filter}`
                  }
                }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              InputProps = {{ 'aria-label': 'search' }}
            /> 
          </Search>

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
              <Grid item sx={{ mt:2 ,width: 300 }}>
                <Typography variant='body2' color='text.secondary'>
                  Price
                </Typography>
              <Slider
                aria-label="Price"
                defaultValue={0}
                valueLabelDisplay="auto"
                step={500}
                marks
                min={0}
                max={7000}
                onChange ={e =>setPrice(e.target.value)}
              />
              </Grid>
              <Button sx={{mt:3 , ml:5}} onClick={() => window.location.href=`/instructorfilterResults?subject=${subject}&price=${price}`} >
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
              <Card sx={{ display: 'flex' , backgroundColor:'#f2eeee'}} onClick={() => window.location.href=`/course?courseId=${course._id}`}>
              <CardContent sx={{ flex: 1 }}>
                <Typography  variant="h5" gutterBottom>
                   {course.title}
                </Typography>
                <Typography variant='h5' sx={{mr:63, mt:3,mb:3 }} color='text.secondary'> 
                Course Details</Typography>
                <Typography variant="h5" paragraph sx={{mr:70}}>
                  {course.credithours} Hours
                </Typography>
                { course.price==0 ? (<Typography variant="h5" paragraph sx={{mr:55}}> Free </Typography>) : <Typography variant="h5" paragraph sx={{mr:60}}> Price : {course.price}  </Typography>
                }
                <Rating  sx={{mr:66}} name="Rating" value={course.rating} readOnly />
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
            </ThemeProvider>
      )
}

const CorTraineeView =() =>{
  const [courses,setCourses] = useState([])
  useEffect(() => {
      axios.get('http://localhost:8000/traineeViewCourses', {
        headers: {"token" :  localStorage.getItem("token")}
      }).then(
      (res) => { 

          setCourses(res.data)
          
      })}
       );
      return(
        
        <ThemeProvider theme={theme}>
          <CssBaseline />
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

          <Box   noValidate sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',  height: '100%',
            rowGap :8
          }}>
          
          {courses.map((course) =>(
            
            <Grid item sx={{width: '70%',  height: '100%' , ml:9 }}>
            <CardActionArea component="a" onClick={() => window.location.href=`/course?courseId=${course._id}`}>
              <Card sx={{ display: 'flex' , backgroundColor:'#f2eeee'}} >
              <CardContent sx={{ flex: 1 }}>
                <Typography  variant="h5" gutterBottom sx={{mr:80}}>
                   {course.title}
                </Typography>
                <Typography variant='h5' sx={{mr:63, mt:3,mb:3 }} color='text.secondary'> 
                Course Details</Typography>
                <Typography variant="h5" paragraph sx={{mr:70}}>
                  {course.credithours} Hours
                </Typography>
                
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
            </ThemeProvider>
      )
}

const IndiTraineeView = () =>{

  const [courses,setCourses] = useState([])
  useEffect(() => {
      axios.get('http://localhost:8000/traineeViewCourses', {
        headers: {"token" :  localStorage.getItem("token")}
      }).then(
      (res) => { 

          setCourses(res.data)
          
      })}
       );
      return(
        
        <ThemeProvider theme={theme}>
          <CssBaseline />
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

          <Box   noValidate sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',  height: '100%',
            rowGap :8
          }}>
          
          {courses.map((course) =>(
            
            <Grid item sx={{width: '70%',  height: '100%' , ml:9 }}>
            <CardActionArea component="a" onClick={() => window.location.href=`/course?courseId=${course._id}`}>
              <Card sx={{ display: 'flex' , backgroundColor:'#f2eeee'}} >
              <CardContent sx={{ flex: 1 }}>
                <Typography  variant="h5" gutterBottom sx={{mr:80}}>
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
            </ThemeProvider>
      )
}

const ViewMyCourses = ()=>{

  const [type, setType] = useState('');

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
      } ) ;
  

  let view;     

  
  if(type == 'Instructor'){
     view =<InstructorView></InstructorView>
  } 
  else if(type == 'Individual Trainee'){
      view =<IndiTraineeView></IndiTraineeView>
  }else if(type == 'Corporate Trainee'){
      view=<CorTraineeView></CorTraineeView>
  }else{
    view=<Typography variant='h4'> 404 Page Not found </Typography>
  }
  return(
    <ThemeProvider theme={theme}>
      <Header></Header>
      <Box>
      {view}
      </Box>
      <Footer></Footer>
      </ThemeProvider>
  ) 

}

export default ViewMyCourses;