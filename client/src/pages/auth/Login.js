import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {auth,googleAuthProvider} from '../../firebase';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GoogleOutlined } from "@ant-design/icons";
import axios from 'axios';
import {Divider} from 'antd';
import SvgIcon from '../../images/SvgIcon';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
       React E-commerce
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random/?technology)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  submitGoogle: {
    margin: theme.spacing(3, 0, 2),
    marginTop: theme.spacing(-1),
  },
}));

const createOrUpdateUser = async(authToken) => {

return await axios.post(process.env.REACT_APP_API,{
  authToken:authToken
},
)

}



export default function Login({history}) {
  const classes = useStyles();
  let dispatch= useDispatch();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading]= useState(false);

  const roleBasedRedirect = (role) => {

    if(role === "subscriber") {
      history.push("/user/history");
    }else if(role === "admin"){
      history.push("/admin/dashboard")
    }
  
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try{

        const result = await auth.signInWithEmailAndPassword(email,password);
        const {user} = result;
        const idTokenResult= user.getIdTokenResult();

        const token = (await idTokenResult).token

        createOrUpdateUser(token)
        .then((res)=>{
          console.log(res)
          dispatch({
            type: "LOGGED_IN_USER",
            payload:{
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: token,
            },
        });
        roleBasedRedirect(res.data.role);
        })
        .catch()

      }catch(error){

        console.log(error);
        toast.error(error.message);
        setLoading(false);
      }

  }


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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenOutlinedIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
         {loading ? <CircularProgress color="secondary" /> :
         <>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {e=>setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled= {!email|| password.length <6 }
            >
              Sign In
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
            className={classes.submitGoogle}
            onClick={googleLogin}
          >
            Sign Up with Google
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
            </>

}
        </div>
      </Grid>
    </Grid>
  );
}


