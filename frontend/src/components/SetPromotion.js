import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
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

import Button from '@mui/material/Button';



import Header from '../Headers/header';
import Footer from '../Headers/footer';


const { useState,useEffect } = require("react");

let courseId;
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
        <Button onClick={handleClickOpen} variant="h4"  color='text.primary' sx={{mr:-65}}>
           Define Discount
        </Button>
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


const theme = createTheme({
  palette: {
    primary: {
      main: '#800000',
      light : '#800000',
      dark: '#800000'
    },
    secondary: {
      light: '#800000',
      main: '#800000',
      contrastText: '#ffcc00',
    },
    custom: {
      light: '#800000',
      main: '#800000',
      dark: '#800000',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const ViewRequests = () => {
  const [courses,setCourses] = useState([]);
  //const [state, setState] = useState('');
  const [id, setId] = useState('');
  courseId=id
  console.log(courseId)
  

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
          <Header/>
          <Grid item xs={12} sm={8} md={1} elevation={6} square>
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
              <Box noValidate sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',  height: '100%'
          }}>
              </Box>
          <br></br>
          
          {courses.map((course) =>(
            <Box sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',  height: '100%',
                rowGap :8
              }}>
              <Paper
              sx={{
                p:7,
                margin: 'auto',
                width: 640,
                flexGrow: 1,
                bgcolor:'#f2eeee'
                  
              }}
            style = {{marginLeft:-2}}
            onClick ={e =>setId(course._id)}
            >
              <Grid container spacing={2} sx={{rowGap :8}}>
                  
                <Grid item>
                </Grid>
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item>
                      <Typography gutterBottom variant="h4" component="div" sx={{mr:12}}>
                      {course.title}
                      </Typography>
                      
                    </Grid>
                  </Grid>
                  <Grid item >
                  
                    <FormDialog/>
                  
                  </Grid>
                  
                </Grid>
                
              </Grid>
              
            </Paper>
            </Box>
              ))}  
              
            
            </Box>
            </Grid>
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
            <Footer/>
            </ThemeProvider>
  
      )

}
export default ViewRequests;