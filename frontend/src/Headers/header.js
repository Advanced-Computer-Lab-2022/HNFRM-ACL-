import axios from 'axios';
import { styled, alpha ,useTheme ,createTheme, ThemeProvider} from '@mui/material/styles';
import {InputBase,Box,AppBar,Toolbar,Typography,FormControl,MenuItem,Select,Button,IconButton,Avatar,Menu,Divider,Drawer,ListItem,List,ListItemText,ListItemButton} from '@mui/material';
//import {InboxIcon,SearchIcon,MenuIcon,ListItemIcon,AccountBoxIcon,Logout,ChevronLeftIcon,ChevronRightIcon,MailIcon,PasswordIcon,EditIcon,AccountBalanceWalletIcon,FolderIcon,MoneyIcon,ReportProblemIcon} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Logout from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import MoneyIcon from '@mui/icons-material/Money';
import FolderIcon from '@mui/icons-material/Folder';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';
import InboxIcon from '@mui/icons-material/Inbox';

import countryList from 'react-select-country-list'
import ReactFlagsSelect from 'react-flags-select';
import DiamondIcon from '@mui/icons-material/Diamond';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ListAltIcon from '@mui/icons-material/ListAlt';

import iso from 'iso-country-currency'



const drawerWidth = 240;
const { useState,useEffect ,useMemo } = require("react");

let country='US'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      }),
    }),
  );

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  
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

export default function Header (){
    const [type, setType] = useState('');
    console.log(localStorage.getItem("token"));


    useEffect(()=>{
        axios.get('http://localhost:8000/isLogin' ,{
            headers: {
                "token" :  localStorage.getItem("token")
            },
        }).then(
        (res) => { 
            const user = res.data;
            setType(user.type)
            })
        });

    let header;     

    if(type == 'Admin'){
        header =<AdminHeader></AdminHeader>
    }
    else if(type == 'Instructor'){
        header =<InstructorHeader></InstructorHeader>
    } 
    else if(type == 'Individual Trainee'){
        header =<IndividualHeader></IndividualHeader>
    }
    else if(type == 'Corporate Trainee'){
        header=<CorporateHeader></CorporateHeader>
    }
    else{
        header=<GuestHeader></GuestHeader>
    } 
    return(
        <Box>
        {header}
        </Box>
    )   
}  





const GuestHeader =() =>{
    

    const [searchFilter,setSearchFilter] =useState('');
    
    const [value, setValue] = useState(country)
    country=value
    const options = useMemo(() => countryList().getData(), [])


   const changePrice = async (value) => {
      let bla = iso.getParamByISO(value, 'currency')
      await axios.patch('http://localhost:8000/change',{change : bla })
    }

   const changeHandler = value => {
      setValue(value)
      changePrice(value)
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
            <DiamondIcon sx={{ml:20,width: 36, height: 56}} onClick={() => window.location.href=`/home`}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , mr:85 , height: 36 }} onClick={() => window.location.href=`/home`}>
            HNFRM
          </Typography>
          <Box sx={{ my: 1, mx: 1 , width:900}} bgcolor='white' >
         <ReactFlagsSelect options={options} placeholder = {value} onSelect={changeHandler}/>
           </Box>
          
          <Search 
           onChange ={e =>setSearchFilter(e.target.value)}
           onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    window.location.href=`/results?filter=${searchFilter}`
                  }
                }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <Button color="inherit" onClick={() => window.location.href=`/login`}>Login</Button>
              <Button color="inherit" onClick={() => window.location.href=`/SignUp`}>Sign Up</Button>
            </Toolbar>
          </AppBar>
        </Box>
      );
}  

const AdminHeader =() =>{
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState('');

    const [loggedOut, setLoggedOut] = useState(false);
    const open = Boolean(anchorEl);

    const [searchFilter,setSearchFilter] =useState('');

    const [user, setUser] = useState('');

    const [value, setValue] = useState(country)
    country=value
    const options = useMemo(() => countryList().getData(), [])


   const changePrice = async (value) => {
      let bla = iso.getParamByISO(value, 'currency')
      await axios.patch('http://localhost:8000/change',{change : bla })
    }

   const changeHandler = value => {
      setValue(value)
      changePrice(value)
    }

  
    const logout = async () => {
      let out = await axios.get('http://localhost:8000/logout');
      localStorage.removeItem("token")
      setLoggedOut(true)
      window.location.href=`/`
    }

    

    const [openMenu, setOpenMenu] = useState(false);

    const handleDrawerOpen = () => {
        setOpenMenu(true);
    };

    const handleDrawerClose = () => {
        setOpenMenu(false);
    };

    

    const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
       setAnchorEl(null);
    };

    

    useEffect(() => {
        axios.get('http://localhost:8000/isLogin').then(
        (res) => { 
            const user = res.data
            console.log(user)
            setUser(user)
            
        })}
        
         );


  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={openMenu}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <DiamondIcon sx={{ml:20,width: 36, height: 56}} onClick={() => window.location.href=`/home`}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , mr:85 , height: 36 }} onClick={() => window.location.href=`/home`}>
            HNFRM
          </Typography>
          <Box sx={{ my: 1, mx: 1 , width:900}} bgcolor='white' >
         
           </Box>
      
          <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 0 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            </IconButton>
            <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => window.location.href=`/addAdmin`}>
            <ListItemIcon >
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            Add Another Admin Account
          </MenuItem>
          <MenuItem onClick={() => window.location.href=`/addInstructor`}>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            Add Another Instructor Account
          </MenuItem>
          <MenuItem onClick={() => window.location.href=`/addCorporateTrainee`}>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            Add Another Corporate Trainee Account
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={openMenu}
        openByDefault
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
           <ListItem key={"reported problems"} onClick={() => window.location.href=`/ReportedProblems`}>
           <ListItemButton>
           <ListItemIcon>
            <ReportProblemIcon/>
           </ListItemIcon>
           <ListItemText primary={"Reported Problems"} />
              </ListItemButton>
           </ListItem>
           <Divider />
           <ListItem key={"refund"} onClick={() => window.location.href=`/RefundRequests`}>
           <ListItemButton>
           <ListItemIcon>
            <MoneyIcon/>
           </ListItemIcon>
           <ListItemText primary={"Refund Problems"} />
              </ListItemButton>
           </ListItem>
           <Divider />
           <ListItem key={"Course Requests"} onClick={() => window.location.href=`/CourseRequests`}>
           <ListItemButton>
           <ListItemIcon>
            <FolderIcon/>
           </ListItemIcon>
           <ListItemText primary={"Course Requests"} />
              </ListItemButton>
           </ListItem>
           <Divider />
           <ListItem key={"Set Promotion"} onClick={() => window.location.href=`/set`}>
           <ListItemButton>
           <ListItemIcon>
            <AccountBalanceWalletIcon/>
           </ListItemIcon>
           <ListItemText primary={"Set Promotion"} />
              </ListItemButton>
           </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );

}

const InstructorHeader =() =>{

    const [user,setUser] =useState('');
    const [searchFilter,setSearchFilter] =useState('');
    const [anchorEl, setAnchorEl] = useState('');

    

    const open = Boolean(anchorEl);

    const [value, setValue] = useState(country)
    country=value
    const options = useMemo(() => countryList().getData(), [])


   const changePrice = async (value) => {
      let bla = iso.getParamByISO(value, 'currency')
      await axios.patch('http://localhost:8000/change',{change : bla })
    }

   const changeHandler = value => {
      setValue(value)
      changePrice(value)
    }
   

    
    const [loggedOut, setLoggedOut] = useState(false);
    const logout = async () => {
      let out = await axios.get('http://localhost:8000/logout');
      localStorage.removeItem("token")
      setLoggedOut(true)
      window.location.href=`/`
    }
    

    const [openMenu, setOpenMenu] = useState(false);

    const handleDrawerOpen = () => {
        setOpenMenu(true);
    };

    const handleDrawerClose = () => {
        setOpenMenu(false);
    };

    

    
    const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
       setAnchorEl(null);
    };
    useEffect(() => {
        axios.get('http://localhost:8000/isLogin').then(
        (res) => { 
            const user = res.data
            console.log(user)
            setUser(user)
            
        })}
         );

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={openMenu}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <DiamondIcon sx={{ml:20,width: 36, height: 56}} onClick={() => window.location.href=`/home`}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , mr:85 , height: 36 }} onClick={() => window.location.href=`/home`}>
            HNFRM
          </Typography>
          <Box sx={{ my: 1, mx: 1 , width:900}} bgcolor='white' >
         <ReactFlagsSelect options={options} placeholder = {value} onSelect={changeHandler}/>
           </Box>
          <Search 
           onChange ={e =>setSearchFilter(e.target.value)}
           onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    window.location.href=`/results?filter=${searchFilter}`
                  }
                }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              InputProps = {{ 'aria-label': 'search' }}
            /> 
          </Search>
          <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{user.username}</Avatar>
            </IconButton>
            <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => window.location.href=`/view`}>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => window.location.href=`/edit`}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit Profile
          </MenuItem>
          <MenuItem onClick={() => window.location.href=`/changePassword`}>
            <ListItemIcon>
              <PasswordIcon fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={openMenu}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"createCourse"} onClick={() => window.location.href=`/createCourse`}>
           <ListItemButton>
           <ListItemIcon>
            <AddCircleTwoToneIcon/>
           </ListItemIcon>
           <ListItemText primary={"Create New Course"} />
              </ListItemButton>
           </ListItem>
           <Divider />
           <ListItem key={"MyCourses"} onClick={() => window.location.href=`/myCourses`}>
           <ListItemButton>
           <ListItemIcon>
            <ListAltIcon/>
           </ListItemIcon>
           <ListItemText primary={"My Courses"} />
              </ListItemButton>
           </ListItem>
           <Divider />
           <ListItem key={"PreviouslyReported"} onClick={() => window.location.href=`/previousProblems`}>
           <ListItemButton>
           <ListItemIcon>
            <InboxIcon/>
           </ListItemIcon>
           <ListItemText primary={"Previously Reported"} />
              </ListItemButton>
           </ListItem>
           <Divider />
        </List>
        <Divider />
      </Drawer>
    </Box>
    </ThemeProvider>
  );

}
const DialogWallet = () =>{

  const [open, setOpen] = useState(false);

  const [wallet , setWallet] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
     
    axios.get(`http://localhost:8000/view`,
{headers: {"token" :  localStorage.getItem("token") }} ).then(
     (res) => { 
         const user = res.data
         setWallet(user.wallet)
         //setinstructor(instructor)
         })
 });

  return (
    <div>
      <ListItemButton variant = 'contained' onClick={handleClickOpen}>
      <ListItemIcon>
                  <AccountBalanceWalletIcon/>
                </ListItemIcon>
         Wallet
    </ListItemButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          
          <Grid>
          <Avatar sx={{ m:1,width: 206, height: 166 }}>
          <PaidOutlinedIcon sx ={{fontSize: "250px" , bgcolor: 'primary.main'}}/>
              </Avatar>
            <Typography variant = 'h4'>
              {wallet}
            </Typography>         

            
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}
const IndividualHeader =() =>{

    const [user,setUser] =useState('');;
    const [anchorEl, setAnchorEl] = useState('');
    const open = Boolean(anchorEl);
    const [loggedOut,setLoggedOut] = useState(false);

    const [searchFilter,setSearchFilter] =useState('');


    const [value, setValue] = useState(country)
    country=value
    const options = useMemo(() => countryList().getData(), [])


   const changePrice = async (value) => {
      let bla = iso.getParamByISO(value, 'currency')
      await axios.patch('http://localhost:8000/change',{change : bla })
    }

   const changeHandler = value => {
      setValue(value)
      changePrice(value)
    }

    const logout = async () => {
      let out = await axios.get('http://localhost:8000/logout');
      localStorage.removeItem("token")
      setLoggedOut(true)
      window.location.href=`/`
    }
    
    const [openMenu, setOpenMenu] = useState(false);

    const handleDrawerOpen = () => {
        setOpenMenu(true);
    };

    const handleDrawerClose = () => {
        setOpenMenu(false);
    };

    

    const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
       setAnchorEl(null);
    };

    useEffect(() => {
        axios.get('http://localhost:8000/isLogin').then(
        (res) => { 
            const user = res.data
            console.log(user)
            setUser(user)
            
        })}
         );


  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" open={openMenu}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <DiamondIcon sx={{ml:20,width: 36, height: 56}} onClick={() => window.location.href=`/home`}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , mr:85 , height: 36 }} onClick={() => window.location.href=`/home`}>
            HNFRM
          </Typography>
          <Box sx={{ my: 1, mx: 1 , width:900}} bgcolor='white' >
         <ReactFlagsSelect options={options} placeholder = {value} onSelect={changeHandler}/>
           </Box>
      <Search 
           onChange ={e =>setSearchFilter(e.target.value)}
           onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    window.location.href=`/results?filter=${searchFilter}`
                  }
                }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{user.username}</Avatar>
            </IconButton>
            <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          
          <Divider />
          <MenuItem onClick={() => window.location.href=`/changePassword`}>
            <ListItemIcon>
              <PasswordIcon fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={openMenu}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Divider />
        <List>
          <ListItem>
            <DialogWallet/>
          </ListItem>
        </List>
        <List>
        <ListItem key={"MyCourses"} onClick={() => window.location.href=`/myCourses`}>
            <ListItemButton>
                <ListItemIcon>
                  <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary={"My Courses"} />
            </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key={"PreviouslyReported"} onClick={() => window.location.href=`/previousProblems`}>
           <ListItemButton>
           <ListItemIcon>
            <ReportProblemIcon/>
           </ListItemIcon>
           <ListItemText primary={"Previously Reported"} />
              </ListItemButton>
           </ListItem>
           <Divider />
        </List>
      </Drawer>
    </Box>
  );

}

const CorporateHeader =() =>{

    const [user,setUser] =useState('');
    const [anchorEl, setAnchorEl] = useState('');
    const open = Boolean(anchorEl);

    const [searchFilter,setSearchFilter] =useState('');

    const [value, setValue] = useState(country)
    country=value
    const options = useMemo(() => countryList().getData(), [])


   const changePrice = async (value) => {
      let bla = iso.getParamByISO(value, 'currency')
      await axios.patch('http://localhost:8000/change',{change : bla })
    }

   const changeHandler = value => {
      setValue(value)
      changePrice(value)
    }

    const [openMenu, setOpenMenu] = useState(false);

    const [loggedOut, setLoggedOut] = useState(false);
    const logout = async () => {
      let out = await axios.get('http://localhost:8000/logout');
      localStorage.removeItem("token")
      setLoggedOut(true)
      window.location.href=`/`
    }

    const handleDrawerOpen = () => {
        setOpenMenu(true);
    };

    const handleDrawerClose = () => {
        setOpenMenu(false);
    };

    

    const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
       setAnchorEl(null);
    };


  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={openMenu}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <DiamondIcon sx={{ml:20,width: 36, height: 56}} onClick={() => window.location.href=`/home`}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , mr:85 , height: 36 }} onClick={() => window.location.href=`/home`}>
            HNFRM
          </Typography>
          <Box sx={{ my: 1, mx: 1 , width:900}} bgcolor='white' >
         <ReactFlagsSelect options={options} placeholder = {value} onSelect={changeHandler}/>
           </Box>
      <Search 
           onChange ={e =>setSearchFilter(e.target.value)}
           onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    window.location.href=`/results?filter=${searchFilter}`
                  }
                }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}></Avatar>
            </IconButton>
            <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
         
          <MenuItem>
            <ListItemIcon>
              <PasswordIcon fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>
          <MenuItem  onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={openMenu}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Divider />
        <List>
        <ListItem key={"myCourses"} onClick={() => window.location.href=`/myCourses`}>
           <ListItemButton>
           <ListItemIcon>
            <ListAltIcon/>
           </ListItemIcon>
           <ListItemText primary={"My Courses"} />
              </ListItemButton>
           </ListItem>
           <Divider />

        <ListItem key={"PreviouslyReported"} onClick={() => window.location.href=`/previousProblems`}>
           <ListItemButton>
           <ListItemIcon>
            <InboxIcon/>
           </ListItemIcon>
           <ListItemText primary={"Previously Reported"} />
              </ListItemButton>
           </ListItem>
           <Divider />
        </List>
      </Drawer>
    </Box>
  );

}




