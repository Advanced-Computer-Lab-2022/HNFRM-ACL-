//Upload link 
// put it to the blablabla

import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const { useState } = require("react");


const UploadVideo = () =>{
    const [courseLink, setcourseLink] = useState('');
    //const [subtitle1Link, setsubtitle1Link] = useState('');
    //const [subtitle2Link, setsubtitle2Link] = useState('');
    //const [subtitle3Link, setsubtitle3Link] = useState('');
    //const [subtitle4Link, setsubtitle4Link] = useState('');

    const upload = async() =>{
        let res = await axios.post('http://localhost:8000/UploadVideo?courseId',{link : courseLink})
        console.log(res);
    }
    return (
        <Box component="form" noValidate onSubmit={upload} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="uploadLink"
                  label="Upload Link"
                  name="uploadLink"
                  onChange ={e =>setcourseLink(e.target.value)}
                />
              </Grid>
              </Box>
    )
}
export default UploadVideo;