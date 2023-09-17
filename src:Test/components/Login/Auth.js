import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router } from "react-router-dom";
import "assets/css/material-dashboard-react.css?v=1.9.0";
import Login from "../CustomButtons/LoginButton";
import Button from '@material-ui/core/Button';
import { width } from "@material-ui/system";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://udna.life/">
        uDNA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#f2f2f2",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "20%",
    height:"300px",
    width:"300px",
  },
  login: {
    color: "#0E0D0D",
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  return (
    <Router>
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <CssBaseline />
        <div className={classes.page}>
          <img
            src={" https://udnas3prd-prd.s3.amazonaws.com/icons/uDNA_icone_Roxo_icone-01.png "}
            alt="logo"
            width="120px"
            height="120px"
            color=" #fff"
            border-radius="100%"
          />
          <div 
            className={classes.login}
            width="60px"
            height="60px"
          >
            <Login/>
          </div>
        </div>
        <Box mt={4}>
          <Copyright />
        </Box>
      </Container>
    </Router>
  );
}
