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
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux';
import axios from 'axios';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
}));

const createOrUpdateUser = async(authToken) => {

  return await axios.post(process.env.REACT_APP_API,{
    authToken:authToken
  },
  )
  
  }

export default function CompleteSignUp({history}) {
  const classes = useStyles();

  const firstName = window.localStorage.getItem("firstName");
  const lastName= window.localStorage.getItem("lastName");
  const emailID = window.localStorage.getItem("emailForRegistration");

  const name= firstName+" "+lastName;
  const [password,setPassword] = useState('');
  let dispatch= useDispatch();




  const onFormSubmit = async (e) => {

    e.preventDefault();

    if (!password){
        toast.error("Password in mandatory");
        return;
    }

    if(password.length<6){
        toast.error("Password must min 6 characters");
        return;
    }

    try{
        const result = await auth.signInWithEmailLink(
            emailID,
            window.location.href
        );

        if (result.user.emailVerified){

            window.localStorage.removeItem("emailForRegistration");
            let user = auth.currentUser
            await user.updatePassword(password);
            await user.updateProfile({displayName:name})
            window.localStorage.removeItem("firstName");
            window.localStorage.removeItem("lastName");
            console.log(user);
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
        .then((res)=>{
          dispatch({
            type: "LOGGED_IN_USER",
            payload:{
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: idTokenResult,
            },
        });
        })
        .catch((err)=>{console.log(err)})

          history.push("/");
        }

    }catch(error){

        toast.error(error.message);

    }
  

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
                value={firstName}
                disabled
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
                value={lastName}
                disabled
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
                value={emailID}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
              Please Enter Password to Complete Registration
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}