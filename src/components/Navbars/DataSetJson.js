import AWS from 'aws-sdk';
import ReactDOM from "react-dom"; 
import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js"; 

let responseSuccesUser;
let responseSucces;

function render(){
    return(
        ReactDOM.render(
            <Router>
              <Switch>
                <Route path="/admin/" component={Admin} />
                <Redirect from="/admin/dashboard" to="/admin/user" />
              </Switch>
            </Router>,
            document.getElementById("root")
          )
    )
}

export {responseSuccesUser, responseSucces}

export default function cognitoListUser(cpf){

    let awsConfig2 = {
      "region": "us-east-1",
      "accessKeyId": "AKIA564XY3QK6GKEQWUS", "secretAccessKey": "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"
    };
    AWS.config.update(awsConfig2);
  
    const docClient = new AWS.DynamoDB.DocumentClient();
    const fetchOneByKeyAdress = function () {
        var params = {
            TableName: "Address-3tn77dv2gbag7ibwijizdpc7sa-prd",
            Key: {
                "id": cpf
            }
        };
        docClient.get(params, function (err, data) {
            if (err) {
              const responseError = typeof JSON.stringify(err, null, 2);
              console.log(responseError);
            }
            else {
              const responseSuccesAdress = JSON.stringify(data, null, 2);
              responseSucces = JSON.parse(responseSuccesAdress);
              return(responseSucces);
            }
        })
    }
  
    function fetchOneByKeyUser() {
        var params = {
            TableName: "User-3tn77dv2gbag7ibwijizdpc7sa-prd",
            Key: {
                "id": cpf
            }
        };
        docClient.get(params, function (err, data) {
            if (err) {
                console.log(JSON.stringify(err, null, 2));
            }
            else {
                const ResponseSuccesUser = JSON.stringify(data, null, 2);
                responseSuccesUser = JSON.parse(ResponseSuccesUser);
                render()
                return(responseSuccesUser);
  
            }
        })
    }
  fetchOneByKeyAdress();
  fetchOneByKeyUser();

}