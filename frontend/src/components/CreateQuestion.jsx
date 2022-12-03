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
import Icon from '@mui/material/Icon';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



const { useState } = require("react");

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        HNFRM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const CreateQuestion = () => {
  const params = new URLSearchParams(window.location.search);
  const examID = params.get('examId');
  const [Ques, setQues] = useState('');
  const [Choice1, setChoice1] = useState('');
  const [Choice2, setChoice2] = useState('');
  const [Choice3, setChoice3] = useState('');
  const [Choice4, setChoice4] = useState('');
  const [CorrectAnswer, setCorrectAnswer] = useState('');

  const addQuestion = async () => {
    let res = await axios.post(`http://localhost:8000/createQuestion?examId=${examID}`,
      {
        ques: Ques, choice1: Choice1, choice2: Choice2, choice3: Choice3, choice4: Choice4,
        correctAnswer: CorrectAnswer
      })
    console.log(res);
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={3.5}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <AddCircleOutlineIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Question
            </Typography>
            <Box component="form" noValidate   onSubmit={addQuestion} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="ques"
                label="Question"
                name="ques"
                autoComplete=""
                autoFocus
                onChange={e => setQues(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                name="choice1"
                label="1st choice"
                id="choice1"
                sx={{ right: 10 }}
                autoComplete=""
                onChange={e => setChoice1(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                name="choice2"
                label="2nd choice"
                id="choice2"
                sx={{ left: 10 }}
                autoComplete=""
                onChange={e => setChoice2(e.target.value)}
              />
              <br></br>
              <TextField
                margin="normal"
                required
                name="choice3"
                label="3rd choice"
                id="choice3"
                autoComplete=""
                sx={{ right: 10 }}
                onChange={e => setChoice3(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                name="choice4"
                label="4th choice"
                id="choice4"
                autoComplete=""
                sx={{ left: 10 }}
                onChange={e => setChoice4(e.target.value)}
              />
              <br></br>
              <TextField
                margin="normal"
                fullWidth
                required
                name="correctAnswer"
                label="correct Answer"
                id="correctAnswer"
                autoComplete=""
                onChange={e => setCorrectAnswer(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                 >
                Add
                {console.log(examID)}
                {console.log(Ques)}
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick ={() => window.location.href=`/createQuestion?exam=${examID}`}
                key={examID}>
                Next
                {console.log(examID)}
                {console.log(Ques)}
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default CreateQuestion;