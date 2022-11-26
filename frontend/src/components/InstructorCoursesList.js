import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';


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


const ViewCourses = () => { 
    const [courses,setCourses] = useState([]);
    

    
    useEffect(() => {
        axios.get('http://localhost:8000/myCourses').then(
        (res) => { 
            const courses = res.data
            console.log(courses)
            setCourses(courses)
            
        })}
         );

    
    return(
      <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
        <Box>
          <Grid item xs>
          </Grid>
        </Box>
        {courses.map((course) =>(
          <Box sx={{ my: 3, mx: 2 }}>
            <Grid container alignItems="center" onClick ={() => window.location.href=`/course?userId=${course._id}`}
              key={course._id}>
            <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              {course.title}
            </Typography>
              </Grid>
              <Divider/>
              <Grid item xs>
              <Typography gutterBottom variant="h6" component="div">
              {course.price} EGP
              </Typography>
              </Grid>
              <br></br>
              <Grid item>
              <Typography gutterBottom variant="h6" component="div">
              {course.credithours}
              </Typography>
              </Grid>
              <br></br>
              <Grid item>
              <Rating name="Rating" value={course.rating} readOnly />
              </Grid>
            </Grid>
            <Divider variant="middle" >
            </Divider>
            </Box>
        ))

        }
        <Divider variant="middle" >
            </Divider>
            <Copyright sx={{ mt: 5 }} />
      </Box>
    )
}
export default ViewCourses;