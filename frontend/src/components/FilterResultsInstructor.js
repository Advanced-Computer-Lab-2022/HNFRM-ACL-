import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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


const { useState,useEffect } = require("react");
const theme = createTheme();

const InstructorResults = () => {
    const [courses,setCourses] = useState([]);
    const [search,setSearch] = useState([]);
    const [filter,setfilter] = useState([]);
    const [filterConst,setfilterConst] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const filterRes = params.get('filter');
    const check = params.get('check');
    const instructorId = params.get('instructorId');


    useEffect(() => {
        axios.get(`http://localhost:8000/instructorresults?filter=${filterRes}&check=${check}&instructorId=${instructorId}`).then(
        (res) => { 
            const courses = res.data
            console.log(courses)
            setCourses(courses)
            
        })}
         )
        return(
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
                <TextField
                  id="search"
                  label="Search"
                  name="search"
                  onChange ={e =>setSearch(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href=`/results?filter=${search}`
                    }
                  }}
                />
                <br></br>
                <TextField
                  id="filter"
                  label="Filter By"
                  name="filter"
                  onChange ={e =>setfilter(e.target.value)}
                />

                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange = {e =>setfilterConst("price")}/>} label="Price" />
                    <FormControlLabel control={<Checkbox onChange = {e =>setfilterConst("subject")} />} label="Subject" />
                </FormGroup>
                <Button variant="text" onClick ={() => window.location.href=`/instructorresults?filter=${filter}&check=${filterConst}&instructorId=${instructorId}`}
              key={filter}>
                filter
                </Button>
            <br></br>
            
            {courses.map((course) =>(
                <Paper
                sx={{
                  p: 7,
                  margin: 'auto',
                  maxWidth: 220,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    
                }}
                onClick ={() => window.location.href=`/course?courseId=${course._id}`}
              key={course._id}
              style = {{marginLeft:-2}}
              >
                <Grid container spacing={2}>
                  <Grid item>
                  <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                   <AccountCircleIcon />
                   </Avatar>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                          {course.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {course.credithours} Hours
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Rating
                        </Typography>
                        <Rating name="Rating" value={course.rating} readOnly />
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        {course.price} EGP
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              
                ))}  
                
                <Copyright sx={{ mt: 5 }} />
              
              </Box>
              </Grid>
    
        )

}
export default InstructorResults;