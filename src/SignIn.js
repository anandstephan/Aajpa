import React , {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from '@material-ui/core/FormLabel';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(img/wallpaper2-min.PNG)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ loggedIn, logout, login }) {

  //Use State 
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [contactType, setContactType] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  //Validate-Email
    const validateEmail = (value) => {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if (!value) {
      setEmailError('Email or phone number is required');
    } else if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      setEmailError('Enter a valid email or phone number');
    } else {
      setEmailError('');
    }
  };

  //Validate-Password 
  const validatePassword = (passwordValue) => {
    if (!passwordValue) {
      setPasswordError('Password is required');
    } else if (passwordValue.length < 3) {           //We can change 
      setPasswordError('Password should be of minimum 4 characters length');
    } else {
      setPasswordError('');
    }
  };

  //ON-SUBMIT
  const onSubmitHandler = async(e) =>{
    e.preventDefault()
    if (/^\d{10}$/.test(email)) {
        setContactType('phone');
     } 
     else if (/^\S+@\S+\.\S+$/.test(email)) {
        setContactType('email');
     } 
     else {
        setContactType('');
     }

    // const response = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/login',{
    //   method:"POST",
    //   headers: {
    //     'content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData),

    // })
    
    //       const data = await response.text()
    //       console.log('API Response:', data);
    //       localStorage.setItem("token",data)
    // signup(formData)  //SignIn details 
    }
    const classes = useStyles();
 
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid container justify="center" className={classes.image}>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            direction="row"
            elevation={6}
            square
          >
            <Grid className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In  
              </Typography>
    <form className={classes.form} noValidate
               onSubmit={onSubmitHandler}
              >

<FormLabel>Enter Email or Phone Number</FormLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={contactType === 'phone' ? 'Phone Number' : 'Email Address'}
                  type="text"
                  name="email"
                  value={email} 
                  onChange={e =>setEmail(e.target.value)}
                  autoComplete="email"
                  onBlur={() => validateEmail(email)}
                  error={Boolean(emailError)}
                  helperText={emailError}
                />

          <FormLabel>Enter Password</FormLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password} 
                 onChange={e =>setPassword(e.target.value)}
                  onBlur={() => validatePassword(password)}
                 error={Boolean(passwordError)}
                 helperText={passwordError}
                  autoComplete="current-password"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  margin="normal"
                >
                  Sign In 
                </Button>
                
                <Grid container  >
                  <Box mt={2}>
                  <Grid item> 
                    <Link href="SignUp" variant="body2">
                      {"Don't have an Account?SignUp"}
                    </Link>
                  </Grid>
                  </Box>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
                </form>
            </Grid>
          </Grid>
        
        </Grid>
      </Grid>
    );
  
  };



