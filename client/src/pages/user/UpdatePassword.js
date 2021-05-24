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
import NavHeader from '../../components/NavHeader';
import { red } from '@material-ui/core/colors';


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
  text:{
      color: 'red',
  }
}));

export default function UpdatePassword() {
  const classes = useStyles();

    const [password,setPassword] = useState("");

  const onFormSubmit = async (e) => {

    e.preventDefault();

    await auth.currentUser.updatePassword(password)
    .then( ()=> {
        setPassword("");
        toast.success("Password has been updated successfully.");
    })
    .catch( err => {
        toast.error(err.message);
        setPassword("");
    })

    
   

  };

  const handleChange = (event) => {
    
   setPassword(event.target.value)
   
  };
 


  return (
      <>
      <NavHeader/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update Password
        </Typography>
    
        <form className={classes.form} noValidate onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Enter New Password"
                name="password"
                autoComplete="password"
                onChange={handleChange}
                value={password}
                type="password"
              />
            </Grid>
            <p className={classes.text}>*Password must be minimum 6 characters</p>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={password.length<6}
          >
            submit
          </Button>
        </form>
      </div>
     
    </Container>
    </>
  );
}