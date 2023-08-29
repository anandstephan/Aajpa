import React , {useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { signup } from "./api/Api";



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

export default function SignUp({ loggedIn, logout, login }) {

  //Use State of Form Data
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    dob: "", 
    email: "",
    password: "",
    country: "",
    city: "",
  });

  const [errors, setErrors] = useState({});




  //Validating Fields
  const validateFields = () => {
    const newErrors = {};

     // Validate each field and set errors if applicable
     if (!formData.full_name) {
      newErrors.full_name = "Full name is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Enter a valid email";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password should be of minimum 8 characters length";
    }

    if (!formData.country) {
      newErrors.country = "Enter Country";
    }

    if (!formData.city) {
      newErrors.city = "Enter City";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

    // Validate fields when input loses focus
    const handleBlur = (event) => {
      validateFields(); 
    };

    //Handling Onchange
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  //ON-SUBMIT
  const onSubmitHandler = async(e) =>{
    e.preventDefault()

    signup(formData)
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
                Sign Up 
              </Typography>
    <form className={classes.form} noValidate
               onSubmit={onSubmitHandler}
              >
            <FormLabel>Full Name</FormLabel>
                <TextField 
                   variant="outlined"
                   autoFocus
                   margin="dense"
                   name="full_name"
                   label="Name"
                  fullWidth
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  onBlur={handleBlur}
                  error={Boolean(errors.full_name)}
                  helperText={errors.full_name}
            /> 
  
        <FormControl>
          <FormLabel>Gender</FormLabel>
            <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                margin="normal"
                onBlur={handleBlur}
                error={Boolean(errors.gender)}
                helperText={errors.gender}
            >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
               </RadioGroup>
           </FormControl> <br/>
  
           <FormLabel>Enter DOB</FormLabel>
              <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  onBlur={handleBlur}
                  error={Boolean(errors.dob)}
                  helperText={errors.dob}
             /><br/>
     <FormLabel>Enter Email Address</FormLabel>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    onBlur={handleBlur}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                 />

                 <FormLabel>Enter Password</FormLabel>
                 <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    onBlur={handleBlur}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                 />

                <FormLabel>Enter Country</FormLabel>
                   <TextField
                       label="Country"
                       type="text"
                       name="country"
                       value={formData.country}
                       onChange={handleInputChange}
                       variant="outlined"
                       fullWidth
                       margin="normal"
                       required
                       onBlur={handleBlur}
                       error={Boolean(errors.country)}
                       helperText={errors.country}
                  />
       
        <FormLabel>Enter City</FormLabel>
        <TextField
          label="City"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          onBlur={handleBlur}
          error={Boolean(errors.city)}
          helperText={errors.city}
        />
  
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
  
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  margin="normal"
                >
                  Sign Up 
                </Button>
                
                <Grid container  >
                  <Box mt={2}>
                  <Grid item> 
                    <Link href="SignIn" variant="body2">
                      {"Already have an Account?SignIn"}
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



