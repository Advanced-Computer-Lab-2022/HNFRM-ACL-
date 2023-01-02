import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          HNFRM
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


export default function Footer() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <Box px ={{sm:2 ,height:'25%'}}
         py ={{sm:2 ,height:'5%'}}
         bgcolor ="primary.main" 
         >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Link href ="/" color ="inherit">
                                Contract
                            </Link>
                        </Box>
                        <Box>
                            <Link href ="/" color ="inherit">
                                Support
                            </Link>
                        </Box>
                        <Box>
                            <Link href ="/" color ="inherit">
                                Privacy
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Messages</Box>
                        <Box>
                            <Link href ="/" color ="inherit">
                                Backup
                            </Link>
                        </Box>
                        <Box>
                            <Link href ="/" color ="inherit">
                                History
                            </Link>
                        </Box>
                        <Box>
                            <Link href ="/" color ="inherit">
                                Roll
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Social</Box>
                        <Box>
                            <Link href ="/" color ="inherit">
                                Facebook
                            </Link>
                        </Box>
                        <Box>
                            <Link href ="/" color ="inherit">
                                Instagram
                            </Link>
                        </Box>
                        <Box>
                            <Link href ="/" color ="inherit">
                                Twitter
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            
            <Copyright sx={{ mt: 3, mb: 0 }} />
            </Container>
        </Box>
        </ThemeProvider>
    )
}