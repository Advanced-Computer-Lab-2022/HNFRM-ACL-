import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const { useState , useEffect} = require("react");
const ViewQuestionAnswers = () => { 
    const [questions, setQuestionsAnswers] = useState([])
    const params = new URLSearchParams(window.location.search);
    const exam = params.get('examId');
    console.log(exam);

    useEffect(() => {
        axios.get(`http://localhost:8000/getQuestionAnswers?examId=${exam}`).then(
        (res) => { 
            const questions = res.data
            console.log(questions)
            setQuestionsAnswers(questions) 
        })}
         );
    
        return(
            //button that will display questions
            <div className="ViewQuestionAnswers">
            <Box sx={{marginBottom: 2}}>
            
            {questions.map((question) =>(
                <Paper>
                <h3>{question.ques}</h3>
                <p> Your Answer : {question.correctAnswer} </p>
                <p> The Correct Answer : {question.correctAnswer} </p>
                </Paper>
            ))}
            </Box>  
            </div>
        )
    
}
export default ViewQuestionAnswers;