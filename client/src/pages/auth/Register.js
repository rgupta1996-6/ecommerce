import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth,googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import {Divider} from 'antd';
import SvgIcon from '../../images/SvgIcon';
import {useDispatch} from 'react-redux';
import axios from 'axios';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        React Ecommerce
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleSubmit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: theme.spacing(-1)
  },
}));

const createOrUpdateUser = async(authToken) => {

  return await axios.post(process.env.REACT_APP_API,{
    authToken:authToken
  },
  )
  
  }

export default function SignUp({history}) {
  const classes = useStyles();
  let dispatch= useDispatch();

  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName] = useState("");
  const [emailID,setEmailID] = useState("");


  const roleBasedRedirect = (role) => {

    if(role === "subscriber") {
      history.push("/user/history");
    }else if(role === "admin"){
      history.push("/admin/dashboard")
    }
  
  }

  const onFormSubmit = async (e) => {

    e.preventDefault();
    console.log("env--->",process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(emailID,config);
    toast.success(
        `An Email is sent to registered email ID.Click on the link to complete registration.`
    )

    window.localStorage.setItem("emailForRegistration",emailID);
    window.localStorage.setItem("firstName",firstName);
    window.localStorage.setItem("lastName",lastName);

        setEmailID("");
        setFirstName("");
        setLastName("");

  };

  const handleChange = (event) => {
    event.target.name==="firstName" 
    ? setFirstName(event.target.value)
    : event.target.name==="lastName" 
    ? setLastName(event.target.value)
    : event.target.name==="email" 
    ? setEmailID(event.target.value)
    : console.log("error")
  };

  const googleLogin = () => {

    auth.signInWithPopup(googleAuthProvider)
    .then(async(result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
        .then((res)=>{
          console.log(res);
          dispatch({
            type: "LOGGED_IN_USER",
            payload:{
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult,
                role: res.data.role,
            },
        });
        roleBasedRedirect(res.data.role);
        })
        .catch()
    })
    .catch((err)=>{
        console.log(err);
    toast.error(err.message);
    });
};
 


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
    
        <form className={classes.form} noValidate onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={emailID}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Divider plain>OR</Divider>
          </form>

        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className={classes.googleSubmit}
            startIcon = {<SvgIcon component={SvgIcon} />}
            onClick={googleLogin}
          >
            Sign Up with Google
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}