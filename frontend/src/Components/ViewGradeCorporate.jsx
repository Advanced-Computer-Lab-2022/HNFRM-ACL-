import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';



const { useState } = require("react");
const ViewGradeCorporate = () => { 
    const params = new URLSearchParams(window.location.search);
    const exam = params.get('exam');
    const corporateTrainee = params.get('corporateTrainee');
    const [grade, setGrade] = useState('')
    const viewGradeCorporate=  async () => {
        await axios.get(`http://localhost:8000/viewGradeCorporate?exam=${exam}&corporateTrainee=${corporateTrainee}`).then(
            (res) => { 
                const grade = res.data
                console.log(grade)
                setGrade(grade)  
            }
             );    

    }

    
    return(
      //button that will display questions
      <div className="ViewGradeCorporate">
      <Box sx={{marginBottom: 2}}>
      <Button variant="contained"
      onClick={viewGradeCorporate}
      margin="normal"
      padding="normal"
      >Load grade</Button>
          <div>
          <h1>{grade}</h1>
          </div>
      </Box>  
      </div>
  )

}
export default ViewGradeCorporate;