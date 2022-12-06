import React from "react";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from "axios";


const { useState } = require("react");
const theme = createTheme();
  
 function Contract() {
    const params = new URLSearchParams(window.location.search)
    const instructorId = params.get('instructorId')

    
    const acceptContract = async () => {
        let res = await axios.patch(`http://localhost:8000/contract?instructorId=${instructorId}`)
        console.log(res);
    } 
    return (
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
              Contract which includes all the rights to the posted videos and 
              materials as well as the % taken by the company on each video per registered trainee
              </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={acceptContract}
                >
                  Accept
                </Button>
                
              </Box>
          </Grid>


    )
  
            }
export default Contract;
