import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from '../Headers/header'
import Footer from '../Headers/footer';

const theme = createTheme({
    palette: {
      primary: {
        main: '#800000',
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


const { useState , useEffect} = require("react");
const ViewQuestionAnswers = () => { 
    const [studentAnswers, setStudentAnswers] = useState([])
    const [questions, setQuestions] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])
    const params = new URLSearchParams(window.location.search);
    const examId = params.get('examId');
    console.log('haneen')

    useEffect(() => {
        axios.get(`http://localhost:8000/studentAnswers?examId=${examId}`,{
          headers: {"token" :  localStorage.getItem("token")}
        }).then(
        (res) => { 
            const questions = res.data.answers
            setStudentAnswers(questions)
            console.log(res.data.studentAnswers)
        })
        axios.get(`http://localhost:8000/correctAnswers?examId=${examId}`).then(
          (res) => { 
            const questions = res.data.correctAnswers
            const ques = res.data.questions
            setQuestions(ques)
            setCorrectAnswers(questions)
            console.log(res.data.correctAnswers) 

        })
        });
         
        //console.log(studentAnswers)
    
        return(
            <ThemeProvider theme={theme}>
              <Header></Header>
            <div className="ViewQuestionAnswers">
            <Box sx={{marginBottom: 2}}>
            
            {questions.map((question,index) =>(
                <Box sx={{
                    display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}>
                <Paper sx={{mt:2,width:'50%'}} >
                    <QuestionAnswerIcon color='primary'></QuestionAnswerIcon>
                    <Typography variant='h4'>
                    {index +1} question
                    </Typography>
                    <Typography variant='body1' sx={{mt:2}}>
                    Your Answer : { studentAnswers[index] }
                    </Typography>
                    
                    <Typography variant='body1' >
                    The Correct Answer : { correctAnswers[index] }
                    </Typography>
                    {
                      correctAnswers[index]==studentAnswers[index] ? (<DoneAllIcon color= '#008b02'/>) : (<HighlightOffIcon color ='primary'/>) 
                    }
                </Paper>
                </Box>
            ))}
            </Box>  
            </div>
            <Footer></Footer>
            </ThemeProvider>
        )
    
}
export default ViewQuestionAnswers;