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
import  FormControl from '@mui/material/FormControl';
import  FormLabel from '@mui/material/FormLabel';
import  RadioGroup from '@mui/material/RadioGroup';
import  Radio from '@mui/material/Radio';
import  FormControlLabel from '@mui/material/FormControlLabel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDeferredValue } from 'react';


const { useState ,useEffect} = require("react");
const ViewQuestion = () => { 
    const [questions, setQuestions] = useState([])
    const [StudentAnswer, setStudentAnswer] = useState('');
    const params = new URLSearchParams(window.location.search);
    const exam = params.get('examId');
    const corporateTrainee = params.get('corporateTrainee');
    const individualTrainee = params.get('individualTrainee');

    useEffect(() => {
      axios.get(`http://localhost:8000/getQuestion?examId=${exam}`).then(
      (res) => { 
        const questions = res.data
        console.log(questions)
        setQuestions(questions)  
      })}
       );

      return(
        <Paper>
          <Box >
            {questions.map((question) =>(
              <Grid>
              <Box  >
                <Paper 
                style = {{marginBottom:8 }}
                
                >
                  <Paper sx ={{margin: 'auto',maxWidth :500 ,
               mb: 4,
               backgroundSize: 'cover',}} style ={{marginLeft :-1 }} >
                <FormControl>
                   <Typography variant ="h8" >
                    {question.ques}
                   </Typography>
                       <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                          //onChange={e => setStudentAnswer(e.target.value)}
                          >
                          <FormControlLabel value={question.choice1} control={<Radio />} label={question.choice1}  />
                          <FormControlLabel value={question.choice2} control={<Radio />} label={question.choice2} />
                          <FormControlLabel value={question.choice3} control={<Radio />} label={question.choice3} />
                          <FormControlLabel value={question.choice4} control={<Radio />} label={question.choice4} />
                        </RadioGroup>
                    </FormControl>
                    </Paper>
                    </Paper>
              </Box>
              </Grid>
            ))}
            <Button
                variant="contained"
                margin="normal"
                padding="normal"
                onClick ={() => window.location.href=`/viewGrade?exam=${exam}&corporateTrainee=${corporateTrainee}`}
                >
              Submit
              </Button>
              <br></br>
            </Box>  
            </Paper>
        )
    
}
export default ViewQuestion;