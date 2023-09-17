import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AWS from 'aws-sdk';

import MaterialTable from 'material-table';


const _ = require('lodash');


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
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
      lineHeight: "1"
    }
  }
};



const useStyles = makeStyles(styles);

export default function Status() {
  const classes = useStyles();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [codHouse, setcodHouse] = useState('');
  const [codLab, setcodLab] = useState('');
  const [dateInitial, setdateInitial] = useState('');
  const [price, setPrice] = useState('');
  const [status, setstatus] = useState('');
  const [useriD, setuseriD] = useState('');

  const [state, setState] = React.useState({});
  
  function callToData() {
    let awsConfig2 = {
      "region": "us-east-1",
      "accessKeyId": "AKIA564XY3QK6GKEQWUS", "secretAccessKey": "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"
    };
    
    AWS.config.update(awsConfig2);

    var params = {
      TableName: "PayTable-esVixmarc2021-prd",
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
            { title: 'dateInitial', field: 'dateInitial' },
            { title: 'Id', field: 'id' },
            { title: 'Name', field: 'Name' },
            { title: 'price', field: 'price' },
            { title: 'status', field: 'status' },
            { title: 'useriD', field: 'useriD' },
          ],
          data: data.Items,
        })
      }
    });
  }

  callToData();


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Historico de Transaçōes</h4>
          </CardHeader>
          <CardBody>
          <ul> 
            <MaterialTable
              title=" "
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
                        
                        let tamanh = data.length - 1;
                        const params = {
                          Item: {
                            id: {
                              S: data[tamanh].id,
                            },
                            Name: {
                              S:data[tamanh].Name,
                            },
                            codHouse: {
                              S: "Nothinfg",
                            },
                            codLab: {
                              S: "Nothinfg",
                            },
                            price: {
                              S:data[tamanh].price,
                            },
                            useriD: {
                              S:data[tamanh].useriD,
                            },
                            dateInitial: {
                              S:data[tamanh].dateInitial,
                            },
                            status: {
                              S:data[tamanh].status,
                            },
                            verify: {
                              S:"1",
                            },
                          },
                          ReturnConsumedCapacity: "TOTAL",
                          TableName: "PayTable-esVixmarc2021-prd",
                        };
                        dynamodb.putItem(params, function (err,data) {
                          if (err) console.log(err, err.stack);
                          // an error occurred
                          else alert("Succes!!"); // successful response
                        });                        
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setState(prevState => {
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
            />
 
          </ul>
          </CardBody>
        </Card>
      </GridItem>

      
    </GridContainer>

    
  );
}
