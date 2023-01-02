import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import Header from '../Headers/header';
import Footer from '../Headers/footer';

const { useState,useEffect } = require("react");


const theme = createTheme({
  palette: {
    primary: {
      main: '#800000',
      light : '#800000',
      dark: '#800000'
    },
    secondary: {
      light: '#800000',
      main: '#800000',
      contrastText: '#ffcc00',
    },
    custom: {
      light: '#800000',
      main: '#800000',
      dark: '#800000',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const ViewRequests = () => {
  const [requests,setRequests] = useState([]);
  const [state, setState] = useState('');
  const [id, setId] = useState('');

  const handleAccept = (event) => {
     setState('accepted')
  };

  const handleReject = (event) => {
      setState('rejected')
  };

  useEffect(() => {
      axios.get('http://localhost:8000/refundRequests').then(
      (res) => { 
          const requests = res.data
          setRequests(requests)
          
      })}
       );

   const solve = async () => {
    await axios.patch(`http://localhost:8000/refund?requestId=${id}`,
    {state:state})
    console.log('haneen')
   }     
      return(
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header/>
          <Grid item xs={12} sm={8} md={1} elevation={6} square>
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
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',  height: '100%'
          }}>
              </Box>
          <br></br>
          
          {requests.map((request) =>(
              <Paper
              sx={{
                p: 7,
                margin: 'auto',
                width: 640,
                flexGrow: 1,
                bgcolor:'#f2eeee'
                  
              }}
            style = {{marginLeft:-2}}
            onClick ={e =>setId(request._id)}
            >
              <Grid container spacing={2} sx={{rowGap :8}}>
                  
                <Grid item >
                  
                <Avatar sx={{ mt: 1,width: 56, height: 56, bgcolor: 'primary.main' }}>
                 <ReportProblemIcon />
                 </Avatar>
                </Grid>
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item>
                      <Typography gutterBottom variant="h4" component="div" sx={{mr:12}}>
                      {request.type}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom >
                        UserId : {request.user}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom >
                        CourseId: {request.course}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom sx={{mr:19}}>
                        {request.amount}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item >
                  
                  <FormGroup
                      
                      >
                    <FormControlLabel value="Accept" control={<Checkbox 
                    onChange = {handleAccept}
                     />} label="Accept" />
                    <FormControlLabel value="Reject" control={<Checkbox 
                    onChange ={handleReject}
                    />} label="Reject" />
                  </FormGroup>
                  <Button
                  onClick={solve}>
                    Submit
                  </Button>
                  
                  </Grid>
                  
                </Grid>
                
              </Grid>
              
            </Paper>
              ))}  
              
            
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
export default ViewRequests;

/*const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor:'#800000',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const columns = [
  { id: 'user', label: 'User', minWidth: 170 },
  { id: 'course', label: 'Course', minWidth: 170 },
  { id: 'amount',label: 'Amount',minWidth: 170,
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'accept', label: 'Accept', minWidth: 170 }
];

function createData(username, course, amount) {
  return { username, course, amount};
}



export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [requests , setRequests] = useState([])
  let requestId;

  //refundRequests
  useEffect(()=>{
    axios.get(`http://localhost:8000/refundRequests`).then(
    (res) => { 
        const requests = res.data
        setRequests(requests)
        })
    });

    const change = async()=>{
      let res = await axios.patch(`http://localhost:8000/refund?requestId=${requestId}`,{}
      )
      console.log(res);
    }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
    <Header/>
    <Container>
    <Box
    sx={{
      my: 9,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  
    >
    
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow >
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {requests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((request) => {
                return (
                  <StyledTableRow  hover role="checkbox" tabIndex={-1} key={request._id}>
                    {columns.map((column) => {
                      const value = request[column.id];
                      let bla;
                      requestId = request._id
                      
                      if(column.label=='Accept'){
                        bla=<Checkbox
                        onChange={change}></Checkbox>
                      }
                      else{
                        bla=column.format && typeof value === 'number'
                        ? column.format(value)
                        : value;
                      }
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {bla}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={requests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Box>
    </Container>
    <Footer/>
    </ThemeProvider>
  );
}*/