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
const ViewQuestion = () => { 
    const [questions, setQuestions] = useState([])
    const [StudentAnswer, setStudentAnswer] = useState('');
    const params = new URLSearchParams(window.location.search);
    const exam = params.get('examId');
    const corporateTrainee = params.get('corporateTrainee');
    const individualTrainee = params.get('individualTrainee');

    
    const viewQuestion=  async () => {
        await axios.get(`http://localhost:8000/getQuestion?examId=${exam}`).then(
            (res) => { 
                const questions = res.data
                console.log(questions)
                setQuestions(questions)  
            }
             );    

    }

        return(
            //button that will display questions
            <Paper>
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={viewQuestion}
            margin="normal"
            padding="normal"
            >Load Questions</Button>
            {questions.map((question) =>(
                <div>
                <h1>{question.ques}</h1>
                <p>{question.choice1} </p>
                <p>{question.choice2} </p>
                <p>{question.choice3} </p>
                <p>{question.choice4} </p>
                <TextField
                margin="normal"
                required
                fullWidth
                id="studentAnswer"
                label="Your Answer (Exactly as written in the Exam)"
                name="studentAnswer"
                autoComplete=""
                autoFocus
                onChange={e => setStudentAnswer(e.target.value)}
              />
                <Button
                variant="contained"
                onClick ={axios.get(`http://localhost:8000/checkAnswers?question=${question._id}&corporateTrainee=${corporateTrainee}&individualTrainee=${individualTrainee}`,
                {studentAnswer:StudentAnswer})}
                margin="normal"
                padding="normal"
                >
              Submit
              </Button>
              
                </div>
            ))}
            <Button
                variant="contained"
                margin="normal"
                padding="normal"
                onClick ={() => window.location.href=`/viewGrade?exam=${exam}&corporateTrainee=${corporateTrainee}`}
                >
              Submit and View Grade
              </Button>
            </Box>  
            </Paper>
        )
    
}
export default ViewQuestion;