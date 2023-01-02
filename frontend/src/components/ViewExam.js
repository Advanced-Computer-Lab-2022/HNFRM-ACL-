import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography,CssBaseline,Grid,Box,Card,FormControl,RadioGroup,FormControlLabel,Radio, Button} from '@mui/material';
import Header from '../Headers/header'
import Footer from '../Headers/footer';
const { useState,useEffect } = require("react");

const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#800000',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
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


const ViewExam = () =>{

    const params = new URLSearchParams(window.location.search);
    const examId = params.get('examId');
    const courseId = params.get('courseId');
    const [questions, setQuestions] = useState([])
    const [studentAnswer, setStudentAnswer] = useState('');

    let answers = [];


    const handleChange = (event) => {
      let studentAnswer = event.target.value
      setStudentAnswer(studentAnswer);
      let res = axios.patch(`http://localhost:8000/addStudentAnswer?examId=${examId}`,
                {answer:studentAnswer} , {headers: {"token" :  localStorage.getItem("token")}}
      )}

      const progressIncrease = async () =>{
        let res = await axios.patch(`http://localhost:8000/calculate?courseId=${courseId}`,{},{ headers: {"token" :  localStorage.getItem("token")}})
        console.log(res)
      }

      
    


    useEffect(() => {
      
        axios.get(`http://localhost:8000/viewExam?examId=${examId}`).then(
        (res) => { 
           const questions= res.data
           setQuestions(questions)
           console.log(questions)
          }
        )

        })
  

    const solve = async () =>{
      let res = axios.patch(`http://localhost:8000/checkAnswers?examId=${examId}`,{}
      ,{headers: {"token" :  localStorage.getItem("token")}} )
      console.log(res)
      progressIncrease()
      window.location.href=`/viewGrade?examId=${examId}`

    }    

    return(
        <ThemeProvider theme={theme}>
            <Header/>
          <CssBaseline />
          <Grid>
          <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',  height: '100%',
            rowGap :8,
            marginLeft:9
          }}
          >
            <Typography variant='h4'>
                Please solve this set of questions
            </Typography>
            {questions.map((question) =>(
                <Grid item sx={{width: '70%',  height: '100%'   }}>
                <Card sx ={{ display: 'flex',backgroundColor:'#f2eeee' , width:'100%' , height:'100%'}}
                >
                <FormControl>
                  <Typography variant ='h6' >
                  {question.question}
                  </Typography>
                  
                       
                       <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                          onChange={handleChange}
                          //value={studentAnswer}
                          >
                          <FormControlLabel value={question.choices[0]} control={<Radio 
                          />} label={question.choices[0]}  />
                          <FormControlLabel value={question.choices[1]} control={<Radio 
                          />} label={question.choices[1]} />
                          <FormControlLabel value={question.choices[2]} control={<Radio 
                          />} label={question.choices[2]} />
                          <FormControlLabel value={question.choices[3]} control={<Radio 
                          />} label={question.choices[3]} />
                        </RadioGroup>
                       
                    </FormControl>
                    </Card>
                    </Grid>

            ))}
            <Button variant='contained' size = {'large'} sx={{mb:3 , ml:118}}
            onClick={solve}>
                Submit
            </Button>
            </Box>
          </Grid>
          <Footer/>

        </ThemeProvider>

    )
          

}

export default ViewExam;