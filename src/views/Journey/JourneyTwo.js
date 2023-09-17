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
      FilterExpression: "statusJourney = :this_category AND motivoAtraso <> :this_state",
      ExpressionAttributeValues: { ":this_category": "2", ":this_state": "Aguardando"},
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();

    documentClient.scan(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        setState({
          columns: [
            { title: "Id", field: "id" },
            { title: "UserID", field: "userid" },
            { title: "Data", field: "sdate" },
            { title: "Nmr.Kit's", field: "nkit"},
            { title: "Tmp.entrega", field: "deadline" },
            { title: "Cód.house", field: "codHouse"},
            { title: "Mot.atraso", field: "motivoAtraso"},
            {title: "Tref.atrasada",field: "state", },
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
            title="Transporte Casa"
            columns={state.columns}
            data={state.data}
            editable={{
              onBulkUpdate: changes => 
              new Promise((resolve, reject) => {
                  setTimeout(() => {
                      setState([...data, changes]); 
                      function cognitoListUser(id, responseMotivoAtraso, responseState, responseDeadLine){
                        let responseUser;
                                        
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
  
                        let awsConfig2 = {
                          "region": "us-east-1",
                          "accessKeyId": "AKIA564XY3QK6GKEQWUS", "secretAccessKey": "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"
                        };
                        AWS.config.update(awsConfig2);
                      
                        const docClient = new AWS.DynamoDB.DocumentClient();
                        const fetchOneByKeyAdress = function () {
                            var params = {
                                TableName: "StatusEsvix-2021",
                                Key: {
                                    "id": id
                                }
                            };
                            docClient.get(params, function (err, data) {
                                if (err) {
                                  const responseError = typeof JSON.stringify(err, null, 2);
                                  console.log(responseError);
                                }
                                else {
                                  const responseSuccesAdress = JSON.stringify(data, null, 2);
                                  responseUser = JSON.parse(responseSuccesAdress);
                                  //
                                  responseTitle = _.get(responseUser, 'Item.codHouse', 'Nothinfg');
                                  responseWash = responseTitle.toString();
                                
                                  //
                                  responseDescription = _.get(responseUser, 'Item.state', 'Nothinfg');
                                  responseWashDescription = responseDescription.toString();
                                  //
                                  responseCategory = _.get(responseUser, 'Item.delay', 'Nothinfg');
                                  responseWashCategory = responseCategory.toString();
                                  //
                                  responseId = _.get(responseUser, 'Item.nkit', 'Nothinfg');
                                  responseWashId = responseId.toString();
                                  //
                                  responsePrice = _.get(responseUser, 'Item.sdate', 'Nothinfg');
                                  responseWashPrice = responsePrice.toString();
                                  console.log(responseWash);
                                  //
                                  responseSubTitle = _.get(responseUser, 'Item.userid', 'Nothinfg');
                                  responseWashSubTitle = responseSubTitle.toString();
  
                                  let awsConfig2 = {
                                    region: "us-east-1",
                                    accessKeyId: "AKIA564XY3QK6GKEQWUS",
                                    secretAccessKey:
                                      "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",
                                  };
                                  AWS.config.update(awsConfig2);
                
                                  let dynamodb = new AWS.DynamoDB();
            
                                  let tamanh = state.data.length - 1;
                
                                  const params = {
                                    Item: {
                                      id: {
                                        S: id,
                                      },
                                      codHouse: {
                                        S: responseWash,
                                      },
                                      motivoAtraso: {
                                        S: responseMotivoAtraso,
                                      },
                                      state: {
                                        S:responseState,
                                      },
                                      deadline: {
                                        S:responseDeadLine,
                                      },
                                      delay: {
                                        S: responseWashCategory,
                                      },
                                      nkit: {
                                        S: responseWashId,
                                      },
                                      sdate: {
                                        S: responseWashPrice,
                                      },
                                      statusJourney: {
                                        S: "3",
                                      },
                                      userid: {
                                        S: responseWashSubTitle,
                                      },
                                      verify: {
                                        S: "1",
                                      }
                                      
                                    },
                                    ReturnConsumedCapacity: "TOTAL",
                                    TableName: "StatusEsvix-2021",
                                  };
                                  dynamodb.putItem(params, function (err, data) {
                                    if (err) console.log(err, err.stack);
                                    // an error occurred
                                    else alert('Sucesso!'); // successful response
                                  });
                                  //       
                                }
                            })
                        }
                      
                      fetchOneByKeyAdress();
                      }

                      const responseSuccesAdress = JSON.stringify(changes, null, 2);
                      let responseSucces = JSON.parse(responseSuccesAdress);
                      let responseId = _.get(responseSucces, "0.newData.id", "Nothinfg");
                      let responseMotivoAtraso = _.get(responseSucces, "0.newData.motivoAtraso", "Nothinfg");
                      let responseState = _.get(responseSucces, "0.newData.state", "Nothinfg");
                      let responseDeadLine = _.get(responseSucces, "0.newData.deadline", "Nothinfg");
                      cognitoListUser(responseId, responseMotivoAtraso, responseState, responseDeadLine);
                      resolve();
                      
                  }, 1000);
              }),
            }}
            actions={[
              {
                icon: "update",
                tooltip: "Update",
                onClick: (event, rowData) =>
                  {
                    alert("Parabens, Jornada concluida :D " + rowData.id)
                    console.log(rowData);
                    setstatus1("2");
                    function addFileToDynamoDB() {
                      let awsConfig2 = {
                        region: "us-east-1",
                        accessKeyId: "AKIA564XY3QK6GKEQWUS",
                        secretAccessKey:
                          "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",
                      };
                      AWS.config.update(awsConfig2);
    
                      let dynamodb = new AWS.DynamoDB();

                      let tamanh = state.data.length - 1;
    
                      const params = {
                        Item: {
                          id: {
                            S: rowData.id,
                          },
                          codHouse: {
                            S: rowData.codHouse,
                          },
                          state: {
                            S:rowData.state,
                          },
                          deadline: {
                            S:rowData.deadline,
                          },
                          delay: {
                            S: "1",
                          },
                          nkit: {
                            S: rowData.nkit,
                          },
                          sdate: {
                            S: rowData.sdate,
                          },
                          statusJourney: {
                            S: "3",
                          },
                          userid: {
                            S: rowData.userid,
                          },
                          verify: {
                            S: "1",
                          }
                          
                        },
                        ReturnConsumedCapacity: "TOTAL",
                        TableName: "StatusEsvix-2021",
                      };
                      dynamodb.putItem(params, function (err, data) {
                        if (err) alert('Ops! Faltaram alguns Dados, tente Novamente!!');
                        // an error occurred
                        else console.log('Sucesso'); // successful response
                      });                    
                    }
                    addFileToDynamoDB();
                }
              },
            ]}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
}
