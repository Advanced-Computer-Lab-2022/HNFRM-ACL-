import axios from 'axios';
import { Avatar, Button , CssBaseline, TextField, Link,Box,Grid,Typography,Icon , Container} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';



const { useState } = require("react");

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
  width: '71rem',
  height: '22rem',
};

const CreateExam = () => {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('courseId');
  const [name, setName] = useState('');
  const [examId, setExamId] = useState('');

  /*const addExam = async () => {
    let res = await axios.post(`http://localhost:8000/createExam?courseId=${courseId}`,
      {
        name:name
      })
    setExamId(res._id);
    
    console.log(res);
  }*/
  return (
    <ThemeProvider theme={theme}>
      <Container maxHeight>
            <CssBaseline />
                <Box sx={{ ...commonStyles, borderRadius: '16px' }}> 
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <QuestionMarkIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Create New Exam
            </Typography>
            <Grid>
              <TextField
                margin="normal"
                required
                id="exam"
                label="Exam Name"
                name="exam"
                autoFocus
                onChange={e => setName(e.target.value)}
              />
              <br></br>
              
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Create
              </Button>
              <Grid>
              <Button
               variant="contained" 
                sx={{ mt: 2, mb: 2 }}
                onClick={() => window.location.href=`/createQuestion?examId=${examId}`}
                >
                Set Questions
                </Button>
                </Grid>  
  
              
            </Grid>
            
          </Box>
              </Container>
    </ThemeProvider>
  );
  /*return (
    <ThemeProvider theme={theme}>
      <Container width={'100'} maxHeight>
            <CssBaseline />
                <Box sx={{ ...commonStyles, borderRadius: '16px' }}> 
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <QuestionMarkIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Multiple Choice Question
            </Typography>
            <Grid>
              <TextField
                margin="normal"
                required
                fullWidth
                id="ques"
                label="Question"
                name="ques"
                autoComplete=""
                autoFocus
                multiline
                rows={2}
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
                required
                name="correctAnswer"
                label="Correct Answer"
                id="correctAnswer"
                autoComplete=""
                onChange={e => setCorrectAnswer(e.target.value)}
              />
              <Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                 >
                Add
                {console.log(examID)}
                {console.log(Ques)}
              </Button>
              </Grid>
              
            </Grid>
            
          </Box>
          <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt:2, mb: 2 }}
                onClick ={() => window.location.href=`/createQuestion?exam=${examID}`}
                key={examID}>
                Finish
              </Button>
      </Container>
    </ThemeProvider>
  );*/
}
export default CreateExam;