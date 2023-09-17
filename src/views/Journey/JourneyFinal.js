import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import MaterialTable from "material-table";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AWS from "aws-sdk";

const _ = require("lodash");

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#ffffff",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#fff",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleBlack: {
    color: "#000",
    marginTop: "-20px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "-30px",
    marginBottom: "-30px",
    textDecoration: "none",
    "& small": {
      color: "#fff",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  divHeaderTable: {
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifiContent: "center",
  },
};

const useStyles = makeStyles(styles);

export default function Jorney() {
  const classes = useStyles();

  const [id, setId] = useState("");
  const [nkit, setnkit] = useState("");
  const [codHouse, setcodHouse] = useState("");
  const [codLab, setcodLab] = useState("");
  const [sdate, setsdate] = useState("");
  const [kpdate, setkpdate] = useState("");
  const [dbfarr, setdbfarr] = useState("");
  const [status1, setstatus1] = useState("1");
  const [status2, setstatus2] = useState("");
  const [useriD, setuseriD] = useState("");
  const [doeitle, setdoeitle] = useState("");
  const [kddttc, setkddttc] = useState("");
  const [rfdelai, setrfdelai] = useState("");
  const [rrdate, setrrdate] = useState("");
  const [ssdate, setssdate] = useState("");
  const [data, setData] = useState("");

  const [state, setState] = React.useState({});

  let responseLaudoId;
  let responseWashLaudoId;

  let responseLaudo;
  let responseWashLaudo;

  let responseData;
  let responseWashData;

  let responseSuccesLaudo;

  function callToData() {
    let awsConfig2 = {
      "region": "us-east-1",
      "accessKeyId": "AKIA564XY3QK6GKEQWUS", "secretAccessKey": "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",
    };

    AWS.config.update(awsConfig2);

    var params = {
      TableName: "StatusEsvix-2021",
      FilterExpression: "statusJourney = :this_category",
      ExpressionAttributeValues: { ":this_category": "6" },
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();

    documentClient.scan(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        setState({
          columns: [
            { title: "Id", field: "id" },
            { title: "useriD", field: "userid" },
          ],
          data: data.Items,
        });
      }
      console.log(state.data);
    });
  }
  callToData();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}></h4>
          </CardHeader>
          <MaterialTable
            title="Logistica"
            columns={state.columns}
            data={state.data}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
}
