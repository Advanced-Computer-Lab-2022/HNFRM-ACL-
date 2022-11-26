//Upload link 
// put it to the blablabla

import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
const { useState } = require("react");


const UploadVideo = () =>{
    const [courseLink, setcourseLink] = useState('');
    const [subtitle1Link, setsubtitle1Link] = useState('');
    const [subtitle2Link, setsubtitle2Link] = useState('');
    const [subtitle3Link, setsubtitle3Link] = useState('');
    const [subtitle4Link, setsubtitle4Link] = useState('');
    const [description1, setdescription1] = useState('');
    const [description2, setdescription2] = useState('');
    const [description3, setdescription3] = useState('');
    const [description4, setdescription4] = useState('');

    const upload = async() =>{
        let res = await axios.post('http://localhost:8000/UploadVideo?courseId',{link : courseLink, subtitleslink :{subtitle1Link,subtitle2Link,subtitle3Link,subtitle4Link},descriptions :{description1,description2,description3,description4}})
        console.log(res);
    }
    return (
        <Box component="form" noValidate onSubmit={upload} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
              <Typography gutterBottom variant="h6" component="div">
              Course Link
              </Typography>
                <TextField
                  required
                  fullWidth
                  id="uploadLink"
                  label="Upload Link"
                  name="uploadLink"
                  onChange ={e =>setcourseLink(e.target.value)}
                />
              </Grid>
          <Grid item xs={12} sm={6}>
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 1 Link
                </Typography>
                <TextField
                  required
                  id="subtitleLink1"
                  label="Subtitle Link"
                  name="subtitleLink1"
                  onChange ={e =>setcourseLink(e.target.value)}
                />
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 1 Link Description
                </Typography>
                <TextField
                  required
                  id="description1"
                  label="Description"
                  name="description1"
                  onChange ={e =>setcourseLink(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 2 Link
                </Typography>
                <TextField
                  required
                  id="subtitleLink2"
                  label="Subtitle Link"
                  name="subtitleLink2"
                  onChange ={e =>setcourseLink(e.target.value)}
                />
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 2 Link Description
                </Typography>
                <TextField
                  required
                  id="description2"
                  label="Description"
                  name="description2"
                  onChange ={e =>setcourseLink(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 3 Link
                </Typography>
                <TextField
                  required
                  id="subtitleLink3"
                  label="Subtitle Link"
                  name="subtitleLink3"
                  onChange ={e =>setcourseLink(e.target.value)}
                />
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 3 Link Description
                </Typography>
                <TextField
                  required
                  id="description3"
                  label="Description"
                  name="description3"
                  onChange ={e =>setcourseLink(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 4 Link
                </Typography>
                <TextField
                  required
                  id="subtitleLink4"
                  label="Subtitle Link"
                  name="subtitleLink4"
                  onChange ={e =>setcourseLink(e.target.value)}
                />
                <Typography gutterBottom variant="h6" component="div">
                Subtitle 4 Link Description
                </Typography>
                <TextField
                  required
                  id="description4"
                  label="Description"
                  name="description4"
                  onChange ={e =>setcourseLink(e.target.value)}
                />
                </Grid>
                
              </Box>
  
    )
}
export default UploadVideo;