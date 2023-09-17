import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table2 from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AWS from "aws-sdk";
import FlatList from "flatlist-react";
const _ = require("lodash");

let responseSuccesUser;
let responseSucces;

let responseTitle;
let responseWash;

let responseCategory;
let responseWashCategory;

let responseDescription;
let responseWashDescription;

let responseId;
let responseWashId;

let responsePrice;
let responseWashPrice;

let responseSubTitle;
let responseWashSubTitle;

let responseUrl;
let responseWashUrl;

let responseName;
let responseWashName;

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



export default function TableList() {
  const classes = useStyles();
  const [exam, setExam] = useState(0);
  const [exams] = useState(0);
  let aux;

  let awsConfig2 = {
    region: "us-east-1",
    accessKeyId: "AKIA564XY3QK6GKEQWUS",
    secretAccessKey: "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",
  };

  AWS.config.update(awsConfig2);

  function callToData(onChoiceItem) {
    var params = {
      TableName: "InfoPaternity-exVix2021marc-dev",
      FilterExpression: "qtdFilhos = :this_category",
      ExpressionAttributeValues: { ":this_category": onChoiceItem },
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();

    documentClient.scan(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        setExam(data);

        let aux1 = 0;

        const responseSuccesAdress = JSON.stringify(data, null, 2);
        responseSucces = JSON.parse(responseSuccesAdress);
        //

        do {
          let aux2 = 0;
          responseTitle = _.get(
            responseSucces,
            "Items[" + exams + "].id",
            "Nothinfg"
          );
          responseWash = responseTitle.toString();

          responseName = _.get(
            responseSucces,
            "Items[" + aux2 + "].name",
            "Nothinfg"
          );
          responseWashName = responseName.toString();

          responseDescription = _.get(
            responseSucces,
            "Items[" + aux2 + "].qtdFilhos",
            "Nothinfg"
          );
          responseWashDescription = responseDescription.toString();
          //
          responseCategory = _.get(
            responseSucces,
            "Items[" + aux2 + "].dispJudiciais",
            "Nothinfg"
          );
          responseWashCategory = responseCategory.toString();
          //
          responseId = _.get(
            responseSucces,
            "Items[" + aux2 + "].kitExtra",
            "Nothinfg"
          );
          responseWashId = responseId.toString();
          //
          responsePrice = _.get(
            responseSucces,
            "Items[" + aux2 + "].maeParticip",
            "Nothinfg"
          );
          responseWashPrice = responsePrice.toString();
          //
          responseSubTitle = _.get(
            responseSucces,
            "Items[" + aux2 + "].mtrColetado",
            "Nothinfg"
          );
          responseWashSubTitle = responseSubTitle.toString();

          responseSubTitle = _.get(
            responseSucces,
            "Items[" + aux2 + "].mtrColetado",
            "Nothinfg"
          );
          responseWashSubTitle = responseSubTitle.toString();

          responseUrl = _.get(
            responseSucces,
            "Items[" + aux2 + "].date",
            "Nothinfg"
          );
          responseWashUrl = responseUrl.toString();

          aux2 += 1;
        } while (aux <= data.Items.length);

        //

        //
      }
    });
  }

  callToData("1");

  const clean = exam.Items;

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>LOGÍSTICA</h4>
          </CardHeader>
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell align="space-between">Nome</TableCell>
              <TableCell align="space-between">Data</TableCell>
              <TableCell align="space-between">Q. Filhos</TableCell>
              <TableCell align="space-between">Disp, Jud.</TableCell>
              <TableCell align="space-between">Kit Extra</TableCell>
              <TableCell align="space-between">Mãe Participara?</TableCell>
              <TableCell align="space-between">Material coletado</TableCell>
              <TableCell align="space-between">Valor</TableCell>
            </TableRow>
          </TableHead>
          <CardBody>
            <ul>
              <FlatList
                list={clean}
                renderItem={(exam) => {
                  return (
                    <Table
                      tableHeaderColor="primary"
                      tableData={[
                        [
                          exam.userID,
                          exam.name,
                          exam.date,
                          exam.qtdFilhote,
                          exam.dispJudiciais,
                          exam.kitExtra,
                          exam.maeParticip,
                          exam.mtrColetado,
                          exam.price,
                        ],
                      ]}
                    />
                  );
                }}
                renderWhenEmpty={() => <div>Loading!</div>}
              />
            </ul>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
