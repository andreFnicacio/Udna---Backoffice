import React, {useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AWS from 'aws-sdk';

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const pagarme = require('pagarme');

export default function Dashboard() {
  const classes = useStyles();
  const [vendasDia, setVendasDias] = useState('');
  const [TotalisvendasDia, setTotalVendasDias] = useState('');
  let TotalVendasDia = 0;
  let TotalVendasMes = 0;
  const [vendasMes, setVendasMes] = useState('');
  const [historico, setHistorico] = useState([]);
  let clean;

  function getDataByDay(onChoice) {
    let awsConfig2 = {
      "region": "us-east-1",
      "accessKeyId": "AKIA564XY3QK6GKEQWUS", "secretAccessKey": "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"
    };
    
    AWS.config.update(awsConfig2);

    var params = {
      TableName: "StatusEsvix-2021",
      FilterExpression: "sdate = :this_category",
      ExpressionAttributeValues: { ":this_category": onChoice},
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();

    documentClient.scan(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        setVendasDias(data.Items.length);
      }
    });
  }
  
  let date = new Date().getDate();
  let month = new Date().getMonth();


  let dateCatch = date;
  let monthCatch = month + 1;

  getDataByDay(`${date.toString()}-0${monthCatch.toString()}-2021`);






  
  function getDataByMonth() {
    
    let dataCapturada = new Date(Date().toLocaleString()).getTime()

    pagarme.client.connect({ api_key: 'ak_live_Y16bkcFcHW39fVWVhw13yw6C71HhZb'})
    .then(client => client.transactions.all({date_created: `<=${dataCapturada}`, count: 100}))
    .then((transactions) => {
      clean = transactions;
      setVendasMes(clean.length.toString())
      let TotalVendas = 0;

      for (let i = 0; i < clean.length; i++){
        if(clean[i].status === 'paid'){
          TotalVendas += 1;
          setVendasMes(TotalVendas.toString());
        }
      }
    });
  }

  const TotalisvendasMes = 0;

  getDataByMonth();


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Numero de Kits Enviados:</p>
              <h3 className={classes.cardTitle}>
                 {vendasDia}
              </h3>
            </CardHeader>

          </Card>
        </GridItem>
      </GridContainer>
      
    </div>
  );
}
