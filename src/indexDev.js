import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import { getConfig } from "./config";
import login from "components/Login/Login"
import Auth from "./components/Login/Auth"
import AWS from 'aws-sdk';
import * as serviceWorker from "./serviceWorker";



// core components
import admin from "layouts/Admin"
//import Autentic from "layouts/Autentic";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const pagarme = require('pagarme');
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: "https://localhost:3000/Login",
  onRedirectCallback,
};

const hist = createBrowserHistory();
let clean;

pagarme.client.connect({ api_key: 'ak_live_Y16bkcFcHW39fVWVhw13yw6C71HhZb'})
.then(client => client.transactions.all({count: 1}))
.then((transactions) => {
  clean = transactions
  console.log(clean)
  let awsConfig2 = {
    region: "us-east-1",
    accessKeyId: "AKIA564XY3QK6GKEQWUS",
    secretAccessKey:
      "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",
  };
  AWS.config.update(awsConfig2);

  let dynamodb = new AWS.DynamoDB();

  for(let i = 0; i < clean.length; i++){
    const params = {
      Item: {
        id: {
          S: clean[i].id.toString(),
        },
        Name: {
          S: clean[i].customer.name,
        },
        codHouse: {
          S: "Nothinfg",
        },
        codLab: {
          S: "Nothinfg",
        },
        price: {
          S: clean[i].amount.toString(),
        },
        useriD: {
          S: clean[i].customer.documents[0].number,
        },
        dateInitial: {
          S: clean[i].customer.date_created,
        },
        status: {
          S: clean[i].status,
        },
        verify: {
          S: "1",
        },

      },
      ReturnConsumedCapacity: "TOTAL",
      TableName: "PayTable-esVixmarc2021-prd",
    };
    dynamodb.putItem(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
    });          
  }
});

ReactDOM.render(
  <Auth0Provider
    {...providerConfig}
  > 
    <Router history={hist}>
      <Switch>
        <Route path="/Login" component={login} />
        <Route path="/rtl" component={RTL} />
        <Auth/>
      </Switch>
    </Router>,
  </Auth0Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
