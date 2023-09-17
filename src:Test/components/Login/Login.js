import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { primaryColor } from 'assets/jss/material-dashboard-react';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import jwt_decode from 'jwt-decode';
import AWS from 'aws-sdk';
import ReactDOM from "react-dom"; 
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js"; 
import RTL from "layouts/RTL.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Client } from '@auth0/auth0-spa-js';
import e from 'cors';

function Copyright() {

  
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://udna.life/">
        uDNA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#f1f1f1",
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius:'2%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignIn() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const { loginWithRedirect } = useAuth0();

  const getData = (e) => {
    setValue(e.target.value);
  }

  const getDataPassword = (e) => {
    setValuePassword(e.target.value);
  }

  const email = value;
  const password = valuePassword;

  //awsConfig.js
let cognitoAttributeList = [];

const poolData = {
    UserPoolId : "us-east-1_hc7MEZfw3",
    ClientId : "50m686qt9ipkcpbd2ctdvjak81"
};

const attributes = (key, value) => {
    return {
        Name : key,
        Value : value
    }
};

function setCognitoAttributeList(email, agent) {
    let attributeList = [];
    attributeList.push(attributes('email',email));
    attributeList.forEach(element => {
        cognitoAttributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(element));
    });
}

function getCognitoAttributeList() {
    return cognitoAttributeList;
}

function getCognitoUser(email) {
    const userData = {
        Username : email,
        Pool: getUserPool()
    };
    return new AmazonCognitoIdentity.CognitoUser(userData);
}


function getUserPool(){
    return new AmazonCognitoIdentity.CognitoUserPool(poolData);
}

function getAuthDetails(email, password){
    const authenticationData = {
        Username: email,
        Password : password,
    }
    return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
}

function initAWS (region = process.env.AWS_COGNITO_REGION, identityPoolId = process.env.AWS_COGNITO_IDENTITY_POOL_ID) {
    AWS.config.region = region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId,
    });
}

function decodeJWTToken(token){
    const { email, exp, auth_time, token_use, sub} = jwt_decode(token.idToken);
    return {token, email, exp, uid: sub, auth_time, token_use};
}
//Cognito
function failureCallback(error) {
    console.log("It failed with " + error);
}


function signIn(email, password) {
  return new Promise((resolve) => {
      getCognitoUser(email).authenticateUser(getAuthDetails(email, password), { 
      onSuccess: (result) => {
          const token = {
              accessToken: result.getAccessToken().getJwtToken(),
              idToken: result.getIdToken().getJwtToken(),
              refreshToken: result.getRefreshToken().getToken(),
          }

          return resolve ({ statusCode: 201, response: decodeJWTToken(token)});
      },

      onFailure: (err) => {
        return resolve ({statusCode: 400, response: err.message || JSON.stringify(err)});
      },
      });
  }).catch(failureCallback);
}



const SignInVerify = async (e) => {
  e.preventDefault();
  const resolve = await signIn(email, password);
  if (resolve.statusCode === 400){
      alert("Usuário/Senha Incorretos");
  }else{
    ReactDOM.render(
      <Router>
        <Switch>
          <Route path="/admin/" component={Admin} />
          <Redirect from="/Login" to="/admin/dashboard" />
        </Switch>
      </Router>,
      document.getElementById("root")
    );
  }
}


  return (
  <Router>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <img src={" https://udnas3prd-prd.s3.amazonaws.com/icons/uDNA_icone_Roxo_icone-01.png "} alt="logo" className={classes.img} width="120px" height="120px" backgroundColor=" #000" color=" #fff" border-radius="100%" />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            onChange={getData}
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
            onChange={getDataPassword}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={SignInVerify}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  </Router>
  );
}
