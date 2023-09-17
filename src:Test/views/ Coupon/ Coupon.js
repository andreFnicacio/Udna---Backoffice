import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AWS from "aws-sdk";

import MaterialTable from "material-table";

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
};

const useStyles = makeStyles(styles);

export default function Status() {
  const classes = useStyles();
  const [id, setId] = useState("");
  const [nopartner, seNopartner] = useState("");
  const [cpfcnpj, setCpfcnpj] = useState("");
  const [discount, setDiscount] = useState("");
  const [coupon, setCoupon] = useState("");
  const [doexpiry, setDoexpiry] = useState("");
  const [witcoupon, setWitcoupon] = useState("");
  const [hmputcoupon, setHmputcoupon] = useState("");

  const [state, setState] = React.useState({});

  function callToData() {
    let awsConfig2 = {
      "region": "us-east-1",
      "accessKeyId": "AKIA564XY3QK6GKEQWUS", "secretAccessKey": "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",
    };

    AWS.config.update(awsConfig2);

    var params = {
      TableName: "UdnaDiscount-EsVix2021",
      FilterExpression: "verify = :this_category",
      ExpressionAttributeValues: { ":this_category": "1" },
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();

    documentClient.scan(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        setState({
          columns: [
            { title: "NAME OF PARTNER", field: "nopartner" },
            { title: "CPF/CNPJ:", field: "cpfcnpj" },
            { title: "DISCOUNT", field: "discount" },
            { title: "COUPON", field: "coupon" },
            { title: "DATE", field: "doexpiry" },
            { title: "USER", field: "witcoupon" },
          ],
          data: data.Items,
        });
      }
    });
  }

  callToData();

  console.log(state.data);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}></h4>
          </CardHeader>
          <CardBody>
            <ul>
              <MaterialTable
                title="Coupon"
                columns={state.columns}
                data={state.data}
                editable={{
                  onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setState(prevState => {
                        let data = [...prevState.data];
                        data.push(newData);
                        console.log(data)
                        let awsConfig2 = {
                          region: "us-east-1",
                          accessKeyId: "AKIA564XY3QK6GKEQWUS",
                          secretAccessKey:
                            "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",
                        };
                        AWS.config.update(awsConfig2);
                        
                        let dynamodb = new AWS.DynamoDB();

                        let aux;
                        const random = () => {
                          aux = Math.floor(Math.random() * 10000 + 1)
                          console.log(aux)
                        }
                        random();

                        let aux2 = aux.toString();
                        
                        let tamanh = data.length - 1;
                        const params = {
                          Item: {
                            id: {
                              S: data[tamanh].discount + data[tamanh].nopartner,
                            },
                            nopartner: {
                              S:data[tamanh].nopartner,
                            },
                            cpfcnpj: {
                              S:data[tamanh].cpfcnpj,
                            },
                            discount: {
                              S:data[tamanh].discount,
                            },
                            coupon: {
                              S: data[tamanh].discount + data[tamanh].nopartner,
                            },
                            doexpiry: {
                              S:data[tamanh].doexpiry,
                            },
                            witcoupon: {
                              S:data[tamanh].witcoupon,
                            },
                            verify: {
                              S:"1",
                            },
                          },
                          ReturnConsumedCapacity: "TOTAL",
                          TableName: "UdnaDiscount-EsVix2021",
                        };
                        dynamodb.putItem(params, function (err,data) {
                          if (err) alert("Error!! Tente Novamente!!!");
                          // an error occurred
                          else alert("Succes!!"); // successful response
                        });                        
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        if (oldData) {
                          setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          });
                        }
                      }, 600);
                    }),
                    onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
                }}
                actions={[
                  {
                    icon: "update",
                    tooltip: "Update",
                    onClick: (event, rowData) =>
                      alert("Parabens, Jornada concluida :D " + rowData.id),
                  },
                ]}
              />
            </ul>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
