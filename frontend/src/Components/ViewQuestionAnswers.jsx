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


const { useState } = require("react");
const ViewQuestionAnswers = () => { 
    const params = new URLSearchParams(window.location.search);
    const exam = params.get('exam');
    console.log(exam);
    const [questions, setQuestionsAnswers] = useState([])
    const viewQuestionAnswers=  async () => {
        await axios.get(`http://localhost:8000/getQuestionAnswers?exam=${exam}`).then(
            (res) => { 
                const questions = res.data
                console.log(questions)
                setQuestionsAnswers(questions)  
            }
             );    

    }
        return(
            //button that will display questions
            <div className="ViewQuestionAnswers">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={viewQuestionAnswers}
            margin="normal"
            padding="normal"
            >Load Answers</Button>
            {questions.map((question) =>(
                <div>
                <h1>{question.ques}</h1>
                <p>{question.correctAnswer} </p>
                </div>
            ))}
            </Box>  
            </div>
        )
    
}
export default ViewQuestionAnswers;