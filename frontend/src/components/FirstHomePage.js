import { Typography ,Box, Button,Grid} from "@mui/material";
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import Footer from '../Headers/footer';



export default function FirstHomePage() {

    return(
        <Box
        maxWidth
        maxHeight
               sx={{
               position: 'relative',
               backgroundColor: 'primary.main',
               color: 'white',
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               backgroundImage: `url(${require('./HomePage.gif')})`
            }}>
                <Box sx={{ml:165 }}>
                  <Button size="large" color="inherit" sx={{mt:2 }} onClick={() => window.location.href=`/login`}>Login</Button>
                  <Button size="large" color="inherit" sx={{mt:2 }} onClick={() => window.location.href=`/SignUp`}>Sign Up</Button>
                </Box>
                <Typography variant="h1" sx={{mt:20 , mr:48}}>
                    Welcome to HNFRM
                </Typography>
                <Typography variant="h3" sx={{mt:4 , mr:48}}>
                    The Future Depends on What You Do Today
                </Typography>
                <Typography variant="h6" sx={{mt:2 , mr:40}}>
                    Wanna be a part of one of the biggest online learning platforms
                </Typography>

                <Button size="large" color="inherit" variant ="outlined" sx={{mt:2 , mr:75}} onClick={() => window.location.href=`/home`}>
                    GET STARTED
                </Button>
                <Grid sx={{mt:14 , ml:150}}>
                <SocialIcon url="https://twitter.com/jaketrent" />
                <SocialIcon url="https://www.facebook.com/" />
                <SocialIcon url="https://www.pinterest.it/" />
                <SocialIcon url="https://www.linkedin.com/feed/" />
                <SocialIcon url="https://mail.google.com/mail/u/0/#inbox" />
                </Grid>
                <br></br>
                <br></br>
            </Box>
    );

}