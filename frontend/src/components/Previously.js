import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import Header from '../Headers/header';
import Footer from '../Headers/footer';
import { bgcolor } from '@mui/system';
import { Card } from '@mui/material';


const { useState,useEffect } = require("react");
let problemId;

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


const DialogFollow = () => {
  const [open, setOpen] = useState(false);

  const [followup , setFollowup] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const follow = async () => {
    let res = await axios.patch('http://localhost:8000/followUp',
    {
    followup:followup,problem:problemId})
    console.log(res.data);
    handleClose()
}

  return (
    <div>
      <Button sx={{mr:8,mt:11}} variant = 'contained' onClick={handleClickOpen}>
         Follow
    </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant='h4'>Follow up to your problem</DialogTitle>
        <DialogContent>
          
          <Grid>
          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Write Here"
            fullWidth
            variant="outlined"
            onChange ={e =>setFollowup(e.target.value)}
            multiline
            rows={6}
          />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={follow}>Enter</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const ViewPrev = () => {
    const [problems,setProblems] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:8000/prevReportedProblems',
        {headers: {"token" :  localStorage.getItem("token")}
        }).then(
        (res) => { 
            const problems = res.data
            //console.log(courses)
            setProblems(problems)
            
        })}
      );
        return(
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header/>
            <Grid item 
            xs={12} sm={8} md={1} 
            elevation={6} 
            square

            >
            <Box
              sx={{
                my: 2,
                mx: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
                <br></br>
                <Box noValidate sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',  height: '100%',
                rowGap :8
            }}>
                
            <br></br>
            
            {problems.map((problem) =>(
                <Card
                sx={{
                  p: 7,
                  margin: 'auto',
                  flexGrow: 1,
                  bgcolor:'#f2eeee',

                    
                }
              }
              
              style = {{marginLeft:-9}}
              >
                {problemId=problem._id}
                <Grid container spacing={2} sx={{ width: '100%',  height: '10%',ml:9 }}>
                
                  <Grid item>
                  <Avatar sx={{ m: 3,width: 56, height: 56, bgcolor: 'primary.main' }}>
                   <ReportProblemIcon />
                   </Avatar>
                  </Grid>
                  <Grid item xs={12} sm container >
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item>
                        <Typography gutterBottom variant="h3" component="div" sx={{mt:4,mr:100}}>
                        {problem.type}
                        </Typography>
                        <Typography variant="h5" gutterBottom sx={{mt:2,ml:50}}>
                          {problem.theProblem}
                        </Typography>
                        <Typography variant="h5" gutterBottom sx={{mt:2,ml:50}}>
                          {problem.status} 
                        </Typography>
                      </Grid>
                    </Grid>
                    <div>
                    { (() =>{
                      if(problem.status!='resolved'){
                        <Grid item>
                        <DialogFollow></DialogFollow>
                        </Grid>
                      }
                     } )()}
                    </div>

                    <div>     
                    {
                      problem.status!=='resolved' ? <DialogFollow></DialogFollow> : <p></p>
                    } 
                    </div>
                    
                  </Grid>
                </Grid>
                
              </Card>
                ))} 
                </Box> 
                
              
              </Box>
              </Grid>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Footer/>
              </ThemeProvider>
    
        )

}
export default ViewPrev;