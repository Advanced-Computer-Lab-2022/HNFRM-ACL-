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
import { BsFillEyeSlashFill } from "react-icons/bs";

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
      axios.get('http://localhost:8000/courseRequests').then(
      (res) => { 
          const requests = res.data
          setRequests(requests)
          
      })}
       );

   const solve = async () => {
    await axios.patch(`http://localhost:8000/grant?requestId=${id}`,
    {state:state})
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
                      <Typography variant="subtitle1" gutterBottom>
                        UserId :{request.user}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        CourseId :{request.course}
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


/*import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Checkbox ,Box , Container} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from '../Headers/header';
import Footer from '../Headers/footer';

const { useState,useEffect } = require("react");


const theme = createTheme({
    palette: {
      primary: {
        main: '#c62828',
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.error.dark,
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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const columns = [
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'company', label: 'Company', minWidth: 170 },
  { id: 'course',label: 'Course',minWidth: 170},
  {id:'grant',label:'Approve',minWidth:170}
];

function createData(username, company, course) {
  return { username,company ,course};
}

const rows = [
  createData('Haneen','HaneenInd' ,'Python'),
  createData('Haneen2', 'HaneenInd','Python'),
  createData('Haneen3','HaneenInd' ,'Python'),
  createData('Haneen4','HaneenInd' ,'Python'),
  createData('Haneen5', 'HaneenInd','Python'),
  createData('Haneen6','HaneenInd' ,'Python'),
  createData('Haneen7','HaneenInd' ,'Python'),
  createData('Haneen8','HaneenInd' ,'Python'),
  createData('Haneen9','HaneenInd' ,'Python'),
  createData('Haneen10', 'HaneenInd','Python')
];

export default function StickyCourse() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

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
                  align={column.align}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                
                return (
                  <StyledTableRow  hover role="checkbox" tabIndex={-1} key={row.username}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      let bla;
                      
                      if(column.label=='Approve'){
                        bla=<Checkbox></Checkbox>
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
        count={rows.length}
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