import axios from 'axios';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Header from '../Headers/header'
import Footer from '../Headers/footer';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import MyPDF from './certificate.pdf';

import ReactPlayer from 'react-player'

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

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  width: '35rem',
  height: '6rem',
};


const FormDialog = () => {
    const [open, setOpen] = useState(false);
    const [start, setStart] = useState(dayjs('2022-12-30T21:11:54'));
    const [end, setEnd] = useState(dayjs('2022-12-30T21:11:54'));
    const [discount , setDiscount]=useState('')

    const params = new URLSearchParams(window.location.search)
    const courseId = params.get('courseId')

    const handleStart = (newValue) => {
      setStart(newValue);
    };

    const handleEnd = (newValue) => {
      setEnd(newValue);
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const define = async () =>{
        let res = await axios.post('http://localhost:8000/discount',{amount : discount , startDate : start , endDate:end , courseId:courseId})
        console.log(res)
        handleClose()
    }
  
    return (
      <div>
        <Link onClick={handleClickOpen} variant="h4"  color='text.primary' sx={{mr:-65}}>
           Define Discount
        </Link>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Discount</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Define a promotion for the course (% discount) and for how long
            </DialogContentText>
            <Grid>
            <TextField
              autoFocus
              margin="dense"
              id="discount"
              label="Discount"
              type="discount"
              variant="outlined"
              onChange={(e => setDiscount(e.target.value))}
            />
            </Grid>
            <br></br>
            <Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/DD/YYYY"
                value={start}
                onChange={handleStart}
                renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        </Grid>
        <br></br>
        <Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={end}
                onChange={handleEnd}
                renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={define}>Enter</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};


const BeforeRegisterCor = () =>{
  const [course,setCourse] = useState(" ");
  const [subtitles,setSubtitles] = useState([]);
  const [instructor,setInstructor] = useState ("");
  const [access,setAccess] = useState (false);
  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')

  

  useEffect(()=>{
      axios.get(`http://localhost:8000/course?courseId=${courseId}`).then(
      (res) => { 
          const course = res.data.course
          const courseSubtitles = course.subtitlesName
          
          console.log(course)
          setCourse(course)
          setSubtitles(courseSubtitles)
          setInstructor(course.instructorName)
          })
      });

      const request = async()=>{
        let res = await axios.post(`http://localhost:8000/requestAccess?courseId=${courseId}`,{},
        { headers: {"token" :  localStorage.getItem("token")} }
        )
        setAccess(true)
        console.log(res);
      }


    

 
  

  let button;
  if(access){
    button = <Button
  
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 ,color:"White"}}
    disabled
  >
    Request Access
  </Button>
  }else{
   button =  <Button
  
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 ,color:"White"}}
                  onClick={request}
                >
                  Request Access
                </Button>

  }              
    
  

  return(
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header/>
          <Container maxWidth="lg">
          <Paper
             sx={{
             position: 'relative',
             backgroundColor: 'info.dark',
             color: '#fff',
             mb:4,
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',
             backgroundPosition: 'center',
             backgroundImage: `url(${require('./PythonCourse.png')})`
          }}>
              {<image style={{ display: 'none' }} src={require('./PythonCourse.png')} alt={"imageText"} />}
              <Box
              
                  sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: 'rgba(0,0,0,.7)',
                  
          }}/>

              <Grid container>
                <Grid item md={6}>
                   <Box
                      sx={{
                      position: 'relative',
                      p: { xs: 3, md: 6 },
                      pr: { md: 0 },
          }}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="h4" color="inherit" paragraph>
              {course.credithours} Hours
          </Typography>
          <Rating name="rating" value={course.rating} readOnly/>
          <Typography variant="h5" color="inherit" paragraph>
            {course.summary}
          </Typography>
         
          {button}

        </Box>
      </Grid>
    </Grid>
  </Paper>
  
  <Box noValidate sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',  height: '100%'
  }}
  >
  <div className='wrapper'> 
  <Typography  variant="h4">
        Course Preview
    </Typography>      
        <div className='youtube-box'>
            <ReactPlayer url={course.link} className='video' controls/>
        </div>
        <br></br>
        <br></br>
    </div>

    <Divider orientation="vertical" />

    <Paper sx={{width: '50%',  height: '100%'}}>
    <Typography  variant="h4" sx={{mt:4,mb:4}}>
        Course Outline
    </Typography> 

    {subtitles.map((subtitle) =>(
         <Typography variant="body1" sx={{mt:4,mb:4}}>
          {subtitle}
         </Typography>
         
    ))}
    
    </Paper>
    </Box>
  <br></br>
</Container>
<Footer/>
</ThemeProvider>
  )    

  
}

const BeforeRegisterInd = () =>{
  const [course,setCourse] = useState(" ");
  const [subtitles,setSubtitles] = useState([]);
  const [instructor,setInstructor] = useState ("");
  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')


  

  useEffect(()=>{
      axios.get(`http://localhost:8000/course?courseId=${courseId}`).then(
      (res) => { 
          const course = res.data.course
          const courseSubtitles = course.subtitlesName
          
          console.log(course)
          setCourse(course)
          setSubtitles(courseSubtitles)
          })
      });

      console.log(courseId)
  

  return(
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
          <Paper
             sx={{
             position: 'relative',
             backgroundColor: 'info.dark',
             color: '#fff',
             mb: 4,
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',
             backgroundPosition: 'center',
             backgroundImage: `url(${require('./PythonCourse.png')})`
          }}>
              {<image style={{ display: 'none' }} src={require('./PythonCourse.png')} alt={"imageText"} />}
              <Box
              
                  sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: 'rgba(0,0,0,.7)',
                  
          }}/>

              <Grid container>
                <Grid item md={6}>
                   <Box
                      sx={{
                      position: 'relative',
                      p: { xs: 3, md: 6 },
                      pr: { md: 0 },
          }}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="h4" color="inherit" paragraph>
              {course.credithours} Hours
          </Typography>
          <Typography variant="h4" color="inherit" gutterBottom>
              {course.price} 
          </Typography>
          <Rating name="rating" value={course.rating} readOnly/>
          <Typography variant="h5" color="inherit" paragraph>
            {course.summary}
          </Typography>
          <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 ,color:"White"}}
                  onClick={() => window.location.href=`/card?courseId=${courseId}`}
                >
                  Register Now!!!!
                </Button>

        </Box>
      </Grid>
    </Grid>
  </Paper>
  
  <Box noValidate sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',  height: '100%'
  }}
  >
  <div className='wrapper'> 
  <Typography  variant="h4">
        Course Preview
    </Typography>      
        <div className='youtube-box'>
            <ReactPlayer url={course.link} className='video' controls/>
        </div>
        <br></br>
        <br></br>
    </div>

    <Divider orientation="vertical" />

    <Paper sx={{width: '50%',  height: '100%'}}>
    <Typography  variant="h4" sx={{mt:4,mb:4}}>
        Course Outline
    </Typography> 

    {subtitles.map((subtitle) =>(
         <Typography variant="body1" sx={{mt:4,mb:4}}>
          {subtitle}
         </Typography>
         
    ))}
    
    </Paper>
    </Box>
  <br></br>
</Container>
</ThemeProvider>
  )    

  
}

const Guest = () =>{
  const [course,setCourse] = useState(" ");
  const [subtitles,setSubtitles] = useState([]);
  const [instructor,setInstructor] = useState ("");
  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')


  

  useEffect(()=>{
      axios.get(`http://localhost:8000/course?courseId=${courseId}`).then(
      (res) => { 
          const course = res.data.course
          const courseSubtitles = course.subtitlesName
          
          console.log(course)
          setCourse(course)
          setSubtitles(courseSubtitles)
          })
      });

      console.log(courseId)
  

  return(
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
          <Paper
             sx={{
             position: 'relative',
             backgroundColor: 'info.dark',
             color: '#fff',
             mb: 4,
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',
             backgroundPosition: 'center',
             backgroundImage: `url(${require('./PythonCourse.png')})`
          }}>
              {<image style={{ display: 'none' }} src={require('./PythonCourse.png')} alt={"imageText"} />}
              <Box
              
                  sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: 'rgba(0,0,0,.7)',
                  
          }}/>

              <Grid container>
                <Grid item md={6}>
                   <Box
                      sx={{
                      position: 'relative',
                      p: { xs: 3, md: 6 },
                      pr: { md: 0 },
          }}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="h4" color="inherit" paragraph>
              {course.credithours} Hours
          </Typography>
          <Typography variant="h4" color="inherit" gutterBottom>
              {course.price} 
          </Typography>
          <Rating name="rating" value={course.rating} readOnly/>
          <Typography variant="h5" color="inherit" paragraph>
            {course.summary}
          </Typography>

        </Box>
      </Grid>
    </Grid>
  </Paper>
  
  <Box noValidate sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',  height: '100%'
  }}
  >
  <div className='wrapper'> 
  <Typography  variant="h4">
        Course Preview
    </Typography>      
        <div className='youtube-box'>
            <ReactPlayer url={course.link} className='video' controls/>
        </div>
        <br></br>
        <br></br>
    </div>

    <Divider orientation="vertical" />

    <Paper sx={{width: '50%',  height: '100%'}}>
    <Typography  variant="h4" sx={{mt:4,mb:4}}>
        Course Outline
    </Typography> 

    {subtitles.map((subtitle) =>(
         <Typography variant="body1" sx={{mt:4,mb:4}}>
          {subtitle}
         </Typography>
         
    ))}
    
    </Paper>
    </Box>
  <br></br>
</Container>
</ThemeProvider>
  )

}

const CTrainee = () =>{

  const [course,setCourse] = useState(" ");
  const [subtitles,setSubtitles] = useState([]);
  const [CourseRate,setCourseRate] = useState ("");
  const [InstructorRate,setInstructorRate] = useState ("");
  const [instructorId,setInstructorId] = useState ("");
  const [progress,setProgress] = useState (0);
  const [rating,setCourseRating] = useState (0);

  const [reviews,setReviews] = useState ([]);
  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')
  id=courseId


  

     useEffect(()=>{
        axios.get(`http://localhost:8000/course?courseId=${courseId}`).then(
        (res) => { 
            const course = res.data.course
            const courseSubtitles = res.data.course.subtitles
            
            console.log(course)
            setCourse(course)
            setSubtitles(courseSubtitles)
            setInstructorId(course.taughtBy)
            setReviews(course.reviews)
            setCourseRating(course.rating)
            })
        axios.get(`http://localhost:8000/getProgress?courseId=${courseId}`,
        { headers: {"token" :  localStorage.getItem("token")} }).then(
          (res) =>{

            setProgress(res.data.value)
          }
        )    
      })
      

      const rateCourse = async () => {
          let res = await axios.patch(`http://localhost:8000/rateCourse?courseId=${courseId}`,{rating:CourseRate})
          console.log(res);
          console.log('Haneen')
      }

      const rateInstructor = async () => {
        console.log('ah')
        let res = await axios.patch(`http://localhost:8000/rateInstructor?instructorId=${instructorId}`,{rating:InstructorRate})
      }

      const send = async () => {
        let res = await axios.get(`http://localhost:8000/recieveCertificate`,
        { headers: {"token" :  localStorage.getItem("token")} }
        )
        console.log(res);
      }

      const request = async()=>{
        let res = await axios.post(`http://localhost:8000/requestRefund?courseId=${courseId}`,{},
        { headers: {"token" :  localStorage.getItem("token")} }
        )
        console.log(res);
      }


      

      
    let res=
       <Grid item xs={12} md={6}>
                <Typography variant="h5">
                  Subtitles
                </Typography>
                {subtitles.map((subtitle) =>(
                    <CardActionArea component="a" href="#">
                    <Card sx={{ display: 'flex' , mb :3 ,bgcolor :"#881719"}} onClick={() => window.location.href=`/viewVideo?subtitleId=${subtitle}&courseId=${courseId}`}>
                      <CardContent sx={{ flex: 1 }}>
                      <Link href="#" color='text.primary' variant="h4" sx={{mr:1}} >
                           Enter The Class
                        </Link>

                      </CardContent>
                    </Card>
                  </CardActionArea> 
                 ))}
              </Grid>
    let button1;
    let button2;

    let bu = <Button href={MyPDF} download="certificate.pdf"> Download Certificate</Button>
    let by = <Button onClick={send}> Send Certificate</Button>
    if(progress<100){
      button1 = <CircularProgressWithLabel value={progress} />
      button2 = <Box sx={{width: '100%',  height: '100%'}}> {res} </Box>
    }
    else {
      button1 = <Box> {bu} {by} </Box>
    }

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
            <Paper
               sx={{
               position: 'relative',
               backgroundColor: 'primary.main',
               color: '#fff',
               mb: 4,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               backgroundImage: `url(${require('./PythonCourse.png')})`
            }}>
              {<image style={{ display: 'none' }} src={require('./PythonCourse.png')} alt={"imageText"} />}
                <Box
                    sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.8)',
            }}/>

                <Grid container>
                  <Grid item md={6}>
                     <Box
                        sx={{
                        position: 'relative',
                        p: { xs: 3, md: 6 },
                        pr: { md: 0 },
            }}>
            <Typography variant="h3" color="inherit">
              {course.title}
            </Typography>
            <Typography variant="h4" color="inherit" sx={{ml:5}}>
                {course.credithours} Hours
            </Typography>
            
            <Typography variant="h3" color="primary.main" gutterBottom>
                
            </Typography>
            
            <Typography variant="h5" color="inherit" paragraph >
              {course.summary}
            </Typography>
            <Rating name="rating" value={rating}  readOnly/>
            <Typography component="h2" variant="h6" >
                By Instructor 
            </Typography>
            <Link href="#" color='inherit'  onClick={() => window.location.href=`/viewInstructor?userId=${instructorId}`} >{course.instructorName}</Link>
            
          </Box>
          </Grid>
      </Grid>


    </Paper>
     
    <Box>
        {button1}
    </Box>
    
    
    <Box noValidate sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                width: '100%',  height: '100%'
    }}
    >
      {button2}
    
    </Box>



    <Grid container maxWidth="lg"   sx={{ mt: 6 , bgcolor:'grey.200'}}>
    <Paper elevation={0} sx={{ p: 8, bgcolor: 'grey.200' }}>
      <Typography variant="h4" gutterBottom sx={{ml:20}}>
        Reviews
      </Typography>

      {
        reviews.map((review) =>(
          <Paper sx ={{width :"80%",height:"10%",mt:2 , ml:15}}>
            <Typography variant="body2">
                {review} 
            </Typography>
          </Paper>
        ))
      }
      <br></br>

     <DialogReview/>
      
        
      <br></br>
      <Grid item  sx={{mr:95}}>
      <Typography component="h2" variant="h5" color="black">
          Rate Course
      </Typography>
        <Rating name="rating" color="white" value={CourseRate} onChange = {e =>setCourseRate(e.target.value)} onClick={rateCourse}/>
      
      </Grid>
      <br></br>
      <Grid item sx={{mr:82}}>
      <Typography component="h2" variant="h5" color="black">
          Rate Course Instructor 
      </Typography>
      <Rating name="rating2" sx={{mr:13}} value={InstructorRate} onChange = {e =>setInstructorRate(e.target.value)} onClick={rateInstructor}/>
      </Grid>
    </Paper>
      </Grid>

      <Box noValidate sx={{
                marginTop: 2,
                marginLeft:130,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
    }}
    >
      <Button variant='contained' size='large' sx={{mb:1}} onClick={() => window.location.href=`/report?courseId=${courseId}`}>
        Report
      </Button>
      </Box> 
      <Box noValidate sx={{
                marginTop: 6,
                marginLeft:120,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
    }}
    >
      </Box>
      
    <br></br>
    <br></br>
    
    <br></br>

  </Container>
 </ThemeProvider>
    )   
}

const Instructor = () =>{

  const [course,setCourse] = useState(" ");
  const [reviews,setReviews] = useState ([]);
  const [discount,setDiscount] = useState('')
  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')
  

    useEffect(()=>{
        axios.get(`http://localhost:8000/course?courseId=${courseId}`).then(
        (res) => { 
            const course = res.data.course
            setCourse(course)
            reviews = course.reviews
            setReviews(reviews)
            setDiscount(res.data.discount)

            })
        });

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
            <Paper
               sx={{
               position: 'relative',
               backgroundColor: 'primary.main',
               color: '#fff',
               mb: 4,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               backgroundImage: `url(${require('./PythonCourse.png')})`
            }}>
              {<image style={{ display: 'none' }} src={require('./PythonCourse.png')} alt={"imageText"} />}
                <Box
                    sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.7)',
            }}/>

                <Grid container>
                  <Grid item md={6}>
                     <Box
                        sx={{
                        position: 'relative',
                        p: { xs: 3, md: 6 },
                        pr: { md: 0 },
            }}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom >
              {course.title}
            </Typography>
            <Typography variant="h4" color="inherit" sx={{ml:5}}>
                {course.credithours} Hours
            </Typography>
            <Typography variant="h4" color="inherit" sx={{ml:12}}>
                Price : {course.price} 
            </Typography>
            <Typography color="primary.main" variant='h6'>
              {discount} %
            </Typography>
            <Rating name="rating" value={course.rating} readOnly sx={{mr:35}}/>
            <Typography variant="h5" color="inherit" paragraph sx={{mr:-25}}>
            <Rating name="rating" value={course.rating} readOnly sx={{mr:35}}/>
              {course.summary}
            </Typography>
            <FormDialog/>
          </Box>
        </Grid>
      </Grid>
    </Paper>
    

    <Box noValidate sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                width: '100%',  height: '100%'
    }}
    >
    <Box sx={{width: '100%',  height: '100%' , ml:4}}>
              <Grid item >
              
              </Grid>
    </Box>
  </Box>

  <Grid item xs={12} md={4} sx={{mb:19}}>
         <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h4" gutterBottom>
          Reviews
        </Typography>
  
        {
          reviews.map((review) =>(
            <Paper sx ={{width :"80%",height:"100%",mt:2 , ml:15}}>
              <Typography variant="body2">
                   {review} 
              </Typography>
            </Paper>
          ))
        }
        
          
        </Paper>
        </Grid>
<Box noValidate sx={{
                marginTop: 5,
                marginLeft:130,
                mb:5,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
    }}
    >
      <Button variant='contained' size='large' sx={{mb:1}} onClick={() => window.location.href=`/report?courseId=${courseId}`}>
        Report
      </Button>
      </Box> 
  </Container>
 </ThemeProvider>
    )
  
}


let id;

const DialogReview = () => {
  const [open, setOpen] = useState(false);

  const [review, setReview] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const write = async () =>{
        
    let res = await axios.patch(`http://localhost:8000/writeReviewCourse?courseId=${id}`,
    {review:review}
    )
    handleClose()
  }  

  return (
    <div>
      <Button variant = 'contained' onClick={handleClickOpen} sx={{ml:20}}>
         Write Review
    </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Write your review</DialogTitle>
        <DialogContent>
          
          <Grid>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            onChange ={e =>setReview(e.target.value)}
          />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={write}>Enter</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const Itrainee = () =>{

  const [course,setCourse] = useState(" ");
  const [subtitles,setSubtitles] = useState([]);
  const [CourseRate,setCourseRate] = useState ("");
  const [InstructorRate,setInstructorRate] = useState ("");
  const [instructorId,setInstructorId] = useState ("");
  const [progress,setProgress] = useState (0);
  const [rating,setCourseRating] = useState (0);

  const [reviews,setReviews] = useState ([]);
  const [discount,setDiscount] = useState ("");
  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')
  id=courseId


  

     useEffect(()=>{
        axios.get(`http://localhost:8000/course?courseId=${courseId}`).then(
        (res) => { 
            const course = res.data.course
            const courseSubtitles = res.data.course.subtitles
            
            console.log(course)
            setCourse(course)
            setSubtitles(courseSubtitles)
            setInstructorId(course.taughtBy)
            setDiscount(res.data.discount.amount)
            setReviews(course.reviews)
            setCourseRating(course.rating)
            })
        axios.get(`http://localhost:8000/getProgress?courseId=${courseId}`,
        { headers: {"token" :  localStorage.getItem("token")} }).then(
          (res) =>{

            setProgress(res.data.value)
          }
        )    
      })
      

      const rateCourse = async () => {
          let res = await axios.patch(`http://localhost:8000/rateCourse?courseId=${courseId}`,{rating:CourseRate})
          console.log(res);
          console.log('Haneen')
      }

      const rateInstructor = async () => {
        console.log('ah')
        let res = await axios.patch(`http://localhost:8000/rateInstructor?instructorId=${instructorId}`,{rating:InstructorRate})
      }

      const send = async () => {
        let res = await axios.get(`http://localhost:8000/recieveCertificate`,
        { headers: {"token" :  localStorage.getItem("token")} }
        )
        console.log(res);
      }

      const request = async()=>{
        let res = await axios.post(`http://localhost:8000/requestRefund?courseId=${courseId}`,{},
        { headers: {"token" :  localStorage.getItem("token")} }
        )
        console.log(res);
      }


      

      
    let res=
       <Grid item xs={12} md={6}>
                <Typography variant="h5">
                  Subtitles
                </Typography>
                {subtitles.map((subtitle) =>(
                    <CardActionArea component="a" href="#">
                    <Card sx={{ display: 'flex' , mb :3 ,bgcolor :"#881719"}} onClick={() => window.location.href=`/viewVideo?subtitleId=${subtitle}&courseId=${courseId}`}>
                      <CardContent sx={{ flex: 1 }}>
                      <Link href="#" color='text.primary' variant="h4" sx={{mr:1}} >
                           Enter The Class
                        </Link>

                      </CardContent>
                    </Card>
                  </CardActionArea> 
                 ))}
              </Grid>
    let button1;
    let button2;
    let button3;
    let bu = <Button href={MyPDF} download="certificate.pdf"> Download Certificate</Button>
    let by = <Button onClick={send}> Send Certificate</Button>
    if(progress<50){
      button1 = <CircularProgressWithLabel value={progress} />
      button2 = <Box sx={{width: '100%',  height: '100%'}}> {res} </Box>
      button3 = <Button variant='contained' size='large' sx={{mb:2}} onClick ={request}> Request Refund </Button>
    }
    else if (progress<100) {
      button1 = <CircularProgressWithLabel value={progress} />
      button2 = <Box sx={{width: '100%',  height: '100%'}}> {res} </Box>
    } 
    else {
      button1 = <Box> {bu} {by} </Box>
    }

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
            <Paper
               sx={{
               position: 'relative',
               backgroundColor: 'primary.main',
               color: '#fff',
               mb: 4,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               backgroundImage: `url(${require('./PythonCourse.png')})`
            }}>
              {<image style={{ display: 'none' }} src={require('./PythonCourse.png')} alt={"imageText"} />}
                <Box
                    sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.8)',
            }}/>

                <Grid container>
                  <Grid item md={6}>
                     <Box
                        sx={{
                        position: 'relative',
                        p: { xs: 3, md: 6 },
                        pr: { md: 0 },
            }}>
            <Typography variant="h3" color="inherit">
              {course.title}
            </Typography>
            <Typography variant="h4" color="inherit" sx={{ml:5}}>
                {course.credithours} Hours
            </Typography>
            <Typography variant="h4" color="inherit" sx={{ml:12}}>
                Price : {course.price} 
            </Typography>
            <Typography color="primary.main" variant='h6'>
              {discount} %
            </Typography>
            
            
            <Typography variant="h5" color="inherit" paragraph >
              {course.summary}
            </Typography>
            <Rating name="rating" value={rating}  readOnly/>
            <Typography component="h2" variant="h6" >
                By Instructor 
            </Typography>
            <Link href="#" color='inherit'  onClick={() => window.location.href=`/viewInstructor?userId=${instructorId}`} >{course.instructorName}</Link>
            
          </Box>
          </Grid>
      </Grid>


    </Paper>
     
    <Box>
        {button1}
    </Box>
    
    
    <Box noValidate sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                width: '100%',  height: '100%'
    }}
    >
      {button2}
    
    </Box>



    <Grid container maxWidth="lg"   sx={{ mt: 6 , bgcolor:'grey.200'}}>
    <Paper elevation={0} sx={{ p: 8, bgcolor: 'grey.200' }}>
      <Typography variant="h4" gutterBottom sx={{ml:20}}>
        Reviews
      </Typography>

      {
        reviews.map((review) =>(
          <Paper sx ={{width :"80%",height:"10%",mt:2 , ml:15}}>
            <Typography variant="body2">
                {review} 
            </Typography>
          </Paper>
        ))
      }
      <br></br>

     <DialogReview/>
      
        
      <br></br>
      <Grid item  sx={{mr:95}}>
      <Typography component="h2" variant="h5" color="black">
          Rate Course
      </Typography>
        <Rating name="rating" color="white" value={CourseRate} onChange = {e =>setCourseRate(e.target.value)} onClick={rateCourse}/>
      
      </Grid>
      <br></br>
      <Grid item sx={{mr:82}}>
      <Typography component="h2" variant="h5" color="black">
          Rate Course Instructor 
      </Typography>
      <Rating name="rating2" sx={{mr:13}} value={InstructorRate} onChange = {e =>setInstructorRate(e.target.value)} onClick={rateInstructor}/>
      </Grid>
    </Paper>
      </Grid>

      <Box noValidate sx={{
                marginTop: 2,
                marginLeft:130,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
    }}
    >
      <Button variant='contained' size='large' sx={{mb:1}} onClick={() => window.location.href=`/report?courseId=${courseId}`}>
        Report
      </Button>
      </Box> 
      <Box noValidate sx={{
                marginTop: 6,
                marginLeft:120,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
    }}
    >
      {button3}
      </Box>
      
    <br></br>
    <br></br>
    
    <br></br>

  </Container>
 </ThemeProvider>
    )   
}
const ViewCourse = () => { 
  const [type, setType] = useState('');
  const [register, setRegister] = useState(false);
  const [taught, setTaught] = useState(false);

  console.log(localStorage.getItem("token"));

  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')


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

      axios.get(`http://localhost:8000/isRegistered?courseId=${courseId}`,{
        headers: {
          "token" :  localStorage.getItem("token")
      },
      }).then(
        (res) =>{
          setRegister(res.data.status)
          console.log('Bla')
        }
      )

      axios.get(`http://localhost:8000/isTaught?courseId=${courseId}`,{
        headers: {
          "token" :  localStorage.getItem("token")
      },
      }).then(
        (res) =>{
          setTaught(res.data.status)
        }
      )
      
      } ) ;
  
  
  let view;     

  
  if(type == 'Instructor'&& taught == true){
     view =<Instructor></Instructor>
  }
  else if(type == 'Instructor'&& taught == false){
    view=<BeforeRegisterInd></BeforeRegisterInd>
  } 
  else if(type == 'Individual Trainee' && register == true){
      view =<Itrainee></Itrainee>
  }else if(type == 'Corporate Trainee' && register == true){
      view=<CTrainee></CTrainee>
  }else if(type == 'Individual Trainee'&& register == false){
      view=<BeforeRegisterInd></BeforeRegisterInd>
  }else if(type=='Corporate Trainee'&& register == false){
      view=<BeforeRegisterCor></BeforeRegisterCor>
  }else{
    view=<Guest></Guest>
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

export default ViewCourse;