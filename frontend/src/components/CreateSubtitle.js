import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
let subtitle;

const DialogLink = () => {
  const [open, setOpen] = useState(false);

  const [link, setLink] = useState('');
  const [description , setDescription] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const add = async () => {
    let res = await axios.post('http://localhost:8000/uploadVideo',
    {
    link:link,description:description,subtitle:subtitle})
    console.log(res.data);
    handleClose()
}

  return (
    <div>
      <Button variant = 'contained' fullWidth onClick={handleClickOpen}>
         Add Link
    </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload a video and write short description</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please enter the link and description
          </DialogContentText>
          <Grid>
          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Link"
            fullWidth
            variant="outlined"
            onChange ={e =>setLink(e.target.value)}
          />
          </Grid>
          <Grid>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            onChange ={e =>setDescription(e.target.value)}
          />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={add}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const DialogExam = () =>{
    const [open, setOpen] = useState(false);

    const [examId, setExamId] = useState('');
    const [question, setQuestion] = useState('');
    const [ChoiceOne, setChoiceOne] = useState('');
    const [ChoiceTwo, setChoiceTwo] = useState('');
    const [ChoiceThree, setChoiceThree] = useState('');
    const [ChoiceFour, setChoiceFour] = useState('');
    const [CorrectAnswer, setCorrectAnswer] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
        addExam();
    };

    const handleClose2 = () =>{
      setQuestion('')
      setChoiceOne('')
      setChoiceTwo('')
      setChoiceThree('')
      setChoiceFour('')
      setCorrectAnswer('')
    } 
    
    const handleClose = () => {
        setOpen(false);
    };

    const addExam = async () => {
        let res = await axios.post('http://localhost:8000/createExam',
        {subtitle:subtitle})
        .then((res) => { 
            const user = res.data;
            setExamId(res.data._id)
            console.log(res)
            })
    }

    const addQuestion = async () => {
    let res = await axios.post(`http://localhost:8000/createQuestion?examId=${examId}`,
      {
        question: question,
        choices:[ChoiceOne,ChoiceTwo,ChoiceThree,ChoiceFour],
        correctAnswer: CorrectAnswer
      })
      console.log(res)
      handleClose2()
      handleClickOpen()
  }

  return (
    <div>
      <Button variant = 'contained' fullWidth onClick={handleClickOpen}>
         Add Exam
    </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Write the Question and 4 multiple choices</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please write the question , choice and correct answer
          </DialogContentText>
          <Grid>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            label="Question"
            fullWidth
            variant="outlined"
            onChange ={e =>setQuestion(e.target.value)}
          />
          </Grid>
          <br></br>
          <Grid >
          <TextField
            autoFocus
            margin="dense"
            id="firstChoice"
            label="First Choice"
            variant="outlined"
            onChange ={e =>setChoiceOne(e.target.value)}
          />
          </Grid>
          <Grid>
          <TextField
            autoFocus
            margin="dense"
            id="secondChoice"
            label="Second Choice"
            variant="outlined"
            onChange ={e =>setChoiceTwo(e.target.value)}
          />
          </Grid>
          <Grid>
          <TextField
            autoFocus
            margin="dense"
            id="thirdChoice"
            label="Third Choice"
            variant="outlined"
            onChange ={e =>setChoiceThree(e.target.value)}
          />
          </Grid>
          <Grid>
          <TextField
            autoFocus
            margin="dense"
            id="forthChoice"
            label="Forth Choice"
            variant="outlined"
            onChange ={e =>setChoiceFour(e.target.value)}
          />
          </Grid>
          <br></br>
          <Grid sx={{width:300}} >
          <TextField
            autoFocus
            margin="dense"
            id="correctAnswer"
            label="Correct Answer"
            fullWidth
            variant="outlined"
            onChange ={e =>setCorrectAnswer(e.target.value)}
          />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addQuestion}>Create</Button>
          <Button onClick={handleClose}>Finish</Button>
        </DialogActions>
      </Dialog>
    </div>
  );



}


const Check = () =>{
    const [name, setName] = useState('');
    const [credithour, setCredithour] = useState('');
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
 
    
    subtitle=name;
    const add = async () => {
        let res = await axios.post(`http://localhost:8000/createSubtitle?courseId=${courseId}`,
        {
        name :name  , credithour : credithour},
            { headers: {"token" :  localStorage.getItem("token")} })
        console.log(res.data);
        window.location.href=`/createSubtitle`

    }
    
    

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
                Create Subtitle
              </Typography>
              <Box component="form"  sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete=""
                  autoFocus
                  onChange ={e =>setName(e.target.value)}
                  
                  
                />
                <br></br>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="credithour"
                  label="Credit Hour"
                  id="credithour"
                  autoComplete=""
                  onChange ={e =>setCredithour(e.target.value)}
                />
                <br></br>
                <br></br>
                <DialogLink/>
                <br></br>
                <DialogExam/>
                

                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={add}
                >
                  Create
                </Button>
                <Grid item sx={{ml:70}}>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 3 }}
                  onClick={() => window.location.href=`/createCourse`}
                >
                  Finish
                </Button>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Container>
        <Footer/>
      </ThemeProvider>
    );
}

const CreateSubtitle = () => {
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
      Add =<Typography variant='h2'>YOU DON'T HAVE ACCESS TO THIS PAGE</Typography>
    }

    return(
      <Box>
        {Add}
      </Box>
    )
}
export default CreateSubtitle;