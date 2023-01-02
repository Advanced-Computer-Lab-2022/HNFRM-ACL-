import axios from 'axios';
import ReactPlayer from 'react-player'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import { withStyles } from "@mui/material/styles";
import DownloadIcon from '@mui/icons-material/Download';
import { BsBoxArrowInUp } from 'react-icons/bs';


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

  const ViewVideo = () => {
    const [subtitle, setSubtitle] = useState('');
    //const [subtitleVideos, setSubtitleVideos] = useState([]);
    const [links,setLinks] = useState([])

    const [noteId, setnoteId] = useState('');
    const [contain, setContain] = useState('');
    //const [note,setNote] = useState('');
    //const [subtitle, setSubtitle] = useState('');

    const params = new URLSearchParams(window.location.search);
    const subtitleId = params.get('subtitleId');
    const courseId = params.get('courseId');




    useEffect(() => {
      
        axios.get(`http://localhost:8000/viewVideo?subtitleId=${subtitleId}`).then(
        (res) => { 
           const subtitle= res.data.subtitle
           const links = res.data.results
           setSubtitle(subtitle)
           setLinks(links)
          }
        )  
        } )


        const enter = () =>{
          create()
          window.location.href=`/viewExam?examId=${subtitle.exams}&courseId=${courseId}`
        }



        const create = ()=>{
          console.log('haneen')
          let res = axios.post(`http://localhost:8000/createStudentAnswer?examId=${subtitle.exams}`,{},{headers: {"token" :  localStorage.getItem("token")}} )
          console.log(res)    
        }

        /*const write = async () =>{
          let res = await axios.post(`http://localhost:8000/writeNotes`,{subtitleId:subtitleId,contain:contain},
          {headers: {"token" :  localStorage.getItem("token")}} ).then(
            (res) =>{
              const note = res.data;
              setnoteId(note._id);
            }
          )
        }*/

        /*const download = async () =>{
          let res = await axios.get(`http://localhost:8000/downloadNote?noteId=${noteId}`).then(
            (res) =>{
              fileDownload(res.data, 'note.pdf')
            }
          )
        }*/

        const download =  () =>{
          const element = document.createElement('a');
          console.log('haneen')
          const file = new Blob([document.getElementById('input').value],{
            type:"test/plain;charset-utf-8"
          });
          element.href = URL.createObjectURL(file);
          element.download = 'NewNote.txt'
          document.body.appendChild(element);
          element.click();

        }

        const progressIncrease = async () =>{
          let res = await axios.patch(`http://localhost:8000/calculate?courseId=${courseId}`,{},{ headers: {"token" :  localStorage.getItem("token")} })
          console.log(res)
        }
        
      
         
    return(
        <ThemeProvider theme={theme}>
          <Header/>
          <CssBaseline />
          <Grid item>
            <Box>
             <Typography variant='h2' sx={{mt:2,mb:2}}>
              {subtitle.name}
             </Typography>
            </Box>
          <Box
          sx={{
            marginTop: 2,
            display: 'grid',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',  height: '100%',
            rowGap :8
          }}
          >
            
          {links.map((link) =>(
            
            <Box>
              <Card sx ={{backgroundColor:'#f2eeee'}} >
            <Box>
              <Typography variant='h4' sx={{mt:4}}>
                {link.description}
              </Typography>
              </Box>
              <Card sx ={{backgroundColor:'#f2eeee'}} onClick={progressIncrease}>
             <div className='wrapper'>
                  
              <Card
              onClick={progressIncrease}
              >
                <ReactPlayer url={link.link} className='video' controls/>
              </Card>
            
              </div>
              </Card>
                 <Box  sx={{ borderRadius: '16px' }}>
                  <TextField sx={{ width: '90%' , height :'100%', mb :7 , mt:3}} 
                      id="input"
                      label="Notes"
                      multiline
                      rows={4}
                      onChange ={e => setContain(e.target.value)}>
                     </TextField>
                     <Grid>
                     <Button variant="contained" sx ={{mr:3 , mb:9}} onClick={download}> Submit</Button>
                      <DownloadIcon onClick={download} sx ={{mb:9 , color :'primary.main'}}/>
                      </Grid>
                    </Box>
                    </Card>
                    </Box>
                    

          ))}     
          <Box>
            <Typography variant ='h5'>
              If you finish your subtitles please enter the exam 
            </Typography>
            <Button variant='contained' sx={{mt:3 ,mb:3}} onClick={enter}>
              Enter Exam
            </Button>
          </Box> 

        </Box>
        </Grid>
       
      <Footer/>        
       
              
      </ThemeProvider>
    )
  } 
  export default ViewVideo;