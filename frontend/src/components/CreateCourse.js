import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import PageNotFound from './PageNotFound'


import Header from '../Headers/header';
import Footer from '../Headers/footer';


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



const { useState , useEffect } = require("react");





const Check = () =>{

    const [titleCourse, setTitle] = useState('');
    const [priceCourse, setPrice] = useState('');
    const [summaryCourse, setSummary] = useState('');
    const [subjectCourse, setSubject] = useState('');
    const [linkCourse, setLink] = useState('');
    const [status, setStatus] = useState('');
    const [id, setId] = useState('');


    const add = async () => {
        await axios.post('http://localhost:8000/createCourse',
        {
        title :titleCourse  , 
        defaultPrice : priceCourse ,summary : summaryCourse , subject:subjectCourse , link:linkCourse},
            { headers: {"token" :  localStorage.getItem("token")} } )
            .then((res) =>{
              setStatus(true)
              setId(res.data._id)
            })
          
    }

    useEffect(()=>{
      if(status){
        window.location.href=`/createSubtitle?courseId=${id}`
      }
      });
    

    return (
      <ThemeProvider theme={theme}>
        <Header/>
        <Container component="main" >
          <CssBaseline />
          <Grid item sx= {{height:'100%' , width :'100%'}}>
            <Box
              sx={{
                mt:10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <AddIcon />
              </Avatar>
              <Typography component="h2" variant="h5">
                Create New Course
              </Typography>
              <Box component="form"  sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete=""
                  autoFocus
                  onChange ={e =>setTitle(e.target.value)}
                  sx={{mb:3}}
                  
                />
                <br></br>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>Subject</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={subjectCourse}
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
                <br></br>
                <br></br>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>Price</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={priceCourse}
                  onChange ={e =>setPrice(e.target.value)}
          
                  label="Price"
                >
                  <MenuItem value={"Free"}>Free</MenuItem>
                  <MenuItem value={"1000"}>1000</MenuItem>
                  <MenuItem value={"1500"}>1500</MenuItem>
                  <MenuItem value={"2000"}>2000</MenuItem>
                  <MenuItem value={"2500"}>2500</MenuItem>
                  <MenuItem value={"3000"}>3000</MenuItem>
                  <MenuItem value={"3500"}>3500</MenuItem>
                  <MenuItem value={"4000"}>4000</MenuItem>
                  <MenuItem value={"4500"}>4500</MenuItem>
                  <MenuItem value={"5000"}>5000</MenuItem>
                  <MenuItem value={"5500"}>5500</MenuItem>
                  <MenuItem value={"6000"}>6000</MenuItem>
                  <MenuItem value={"6500"}>6500</MenuItem>
                  <MenuItem value={"7000"}>7000</MenuItem>
                </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="summary"
                  label="Summary"
                  id="summary"
                  autoComplete=""
                  multiline
                  rows={2}
                  sx={{mt:3}}
                  onChange ={e =>setSummary(e.target.value)}
                />
                <br></br>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="link"
                  label="Link"
                  name="link"
                  autoComplete=""
                  autoFocus
                  
                  onChange ={e =>setLink(e.target.value)}
                  
                />
                

                <Button
                  //type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={add}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </Grid>
        </Container>
        <Footer/>
      </ThemeProvider>
    );
}

const CreateCourse = () => {
  
  const [type, setType] = useState('');
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

    let Add;
    if(type=='Instructor'){
      Add =<Check></Check>
    }
    else{
      Add =<PageNotFound></PageNotFound>
    }

    return(
      <Box>
        {Add}
      </Box>
    )
}
export default CreateCourse;
