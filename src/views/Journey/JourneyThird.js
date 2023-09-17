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
      ExpressionAttributeValues: { ":this_category": "3" },
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
            { title: "Nmr.Kit's", field: "nkit" },
            { title: "Cód.Lab", field: "codLab" },
            { title: "Przo.entrega", field: "deadline" },
            { title: "Trfa.atrasada", field: "state", },
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
            editable={{
              onBulkUpdate: changes =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setState([...data, changes]);
                    function cognitoListUser(id, responseState, responseDeadLine, responseCodHouse, responseNKits) {
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
                                  S: responseTitle,
                                },
                                codLab: {
                                  S: responseCodHouse,
                                },
                                state: {
                                  S: responseState,
                                },
                                deadline: {
                                  S: responseDeadLine,
                                },
                                nkit: {
                                  S: responseNKits,
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
                              else alert("Succes"); // successful response
                            });


                            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                            function cognitoList(id, responseCodHouse) {
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
                                  TableName: "PayTable-esVixmarc2021-prd",
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
                                    responseTitle = _.get(responseUser, 'Item.Name', 'Nothinfg');
                                    responseWash = responseTitle.toString();

                                    //
                                    responseDescription = _.get(responseUser, 'Item.codLab', 'Nothinfg');
                                    responseWashDescription = responseDescription.toString();
                                    //
                                    responseCategory = _.get(responseUser, 'Item.dateInitial', 'Nothinfg');
                                    responseWashCategory = responseCategory.toString();
                                    //
                                    responseId = _.get(responseUser, 'Item.price', 'Nothinfg');
                                    responseWashId = responseId.toString();
                                    //
                                    responsePrice = _.get(responseUser, 'Item.status', 'Nothinfg');
                                    responseWashPrice = responsePrice.toString();
                                    console.log(responseWash);
                                    //
                                    responseSubTitle = _.get(responseUser, 'Item.useriD', 'Nothinfg');
                                    responseWashSubTitle = responseSubTitle.toString();

                                    let awsConfig2 = {
                                      region: "us-east-1",
                                      accessKeyId: "AKIA564XY3QK6GKEQWUS",
                                      secretAccessKey:
                                        "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",
                                    };
                                    AWS.config.update(awsConfig2);

                                    let dynamodb = new AWS.DynamoDB();

                                    const params = {
                                      Item: {
                                        id: {
                                          S: id,
                                        },
                                        Name: {
                                          S: responseWash,
                                        },
                                        codHouse: {
                                          S: responseWashDescription,
                                        },
                                        codLab: {
                                          S: responseCodHouse,
                                        },
                                        price: {
                                          S: responseWashId,
                                        },
                                        useriD: {
                                          S: responseWashSubTitle,
                                        },
                                        dateInitial: {
                                          S: responseWashCategory,
                                        },
                                        status: {
                                          S: responseWashPrice,
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
                                      else console.log('Sucesso!!'); // successful response
                                    });
                                    //       
                                  }
                                })
                              }

                              fetchOneByKeyAdress();
                            }
                            cognitoList(id, responseCodHouse)
                            //       
                          }
                        })
                      }

                      fetchOneByKeyAdress();
                    }

                    const responseSuccesAdress = JSON.stringify(changes, null, 2);
                    let responseSucces = JSON.parse(responseSuccesAdress);
                    let responseIds1 = _.get(responseSucces, "0.newData.id", "Nothinfg");
                    let responseIds2 = _.get(responseSucces, "1.newData.id", "Nothinfg");
                    let responseIds3 = _.get(responseSucces, "2.newData.id", "Nothinfg");
                    let responseIds4 = _.get(responseSucces, "3.newData.id", "Nothinfg");
                    let responseIds5 = _.get(responseSucces, "4.newData.id", "Nothinfg");

                    let responseNKits
                    let responseCodHouse
                    let responseDeadLine
                    let responseState
                    let responseId
                    if (responseIds1 !== 'Nothinfg') {
                      responseId = _.get(responseSucces, "0.newData.id", "Nothinfg");
                      responseState = _.get(responseSucces, "0.newData.state", "1.newData.state");
                      responseDeadLine = _.get(responseSucces, "0.newData.deadline", "1.newData.deadline");
                      responseCodHouse = _.get(responseSucces, "0.newData.codLab", "1.newData.codLab");
                      responseNKits = _.get(responseSucces, "0.newData.nkit", "1.newData.nkit");
                    } else {
                      console.log("Error")
                    }
                    if (responseIds2 !== 'Nothinfg') {
                      responseId = _.get(responseSucces, "1.newData.id", "Nothinfg");
                      responseState = _.get(responseSucces, "1.newData.state", "1.newData.state");
                      responseDeadLine = _.get(responseSucces, "1.newData.deadline", "1.newData.deadline");
                      responseCodHouse = _.get(responseSucces, "1.newData.codLab", "1.newData.codLab");
                      responseNKits = _.get(responseSucces, "1.newData.nkit", "1.newData.nkit");
                    } else {
                      console.log("Error")
                    }
                    if (responseIds3 !== 'Nothinfg') {
                      responseId = _.get(responseSucces, "2.newData.id", "Nothinfg");
                      responseState = _.get(responseSucces, "2.newData.state", "1.newData.state");
                      responseDeadLine = _.get(responseSucces, "2.newData.deadline", "1.newData.deadline");
                      responseCodHouse = _.get(responseSucces, "2.newData.codLab", "1.newData.codLab");
                      responseNKits = _.get(responseSucces, "2.newData.nkit", "1.newData.nkit");
                    } else {
                      console.log("Error")
                    }
                    if (responseIds4 !== 'Nothinfg') {
                      responseId = _.get(responseSucces, "3.newData.id", "Nothinfg");
                      responseState = _.get(responseSucces, "3.newData.state", "1.newData.state");
                      responseDeadLine = _.get(responseSucces, "3.newData.deadline", "1.newData.deadline");
                      responseCodHouse = _.get(responseSucces, "3.newData.codLab", "1.newData.codLab");
                      responseNKits = _.get(responseSucces, "3.newData.nkit", "1.newData.nkit");
                    } else {
                      console.log("Error")
                    }
                    if (responseIds5 !== 'Nothinfg') {
                      responseId = _.get(responseSucces, "4.newData.id", "Nothinfg");
                      responseState = _.get(responseSucces, "4.newData.state", "1.newData.state");
                      responseDeadLine = _.get(responseSucces, "4.newData.deadline", "1.newData.deadline");
                      responseCodHouse = _.get(responseSucces, "4.newData.codLab", "1.newData.codLab");
                      responseNKits = _.get(responseSucces, "4.newData.nkit", "1.newData.nkit");
                    } else {
                      console.log("Error")
                    }

                    cognitoListUser(responseId, responseState, responseDeadLine, responseCodHouse, responseNKits);
                    console.log(changes);
                    resolve();

                  }, 1000);
                }),
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
                          userid: {
                            S: data[tamanh].userid,
                          },
                          sdate: {
                            S: data[tamanh].sdate,
                          },
                          nkit: {
                            S: data[tamanh].nkit,
                          },
                          delay: {
                            S: '1',
                          },
                          codHouse: {
                            S: data[tamanh].codHouse,
                          },
                          state: {
                            S: "No Prazo",
                          },
                          deadline: {
                            S: data[tamanh].deadline,
                          },
                          statusJourney: {
                            S: "3",
                          },
                          verify: {
                            S: "1",
                          },
                        },
                        ReturnConsumedCapacity: "TOTAL",
                        TableName: "StatusEsvix-2021",
                      };
                      dynamodb.putItem(params, function (err, data) {
                        if (err) console.log(err, err.stack);
                        // an error occurred
                        else alert("Succes!!"); // successful response
                      });

                      function cognitoListUser(id, responseCodHouse) {
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
                            TableName: "PayTable-esVixmarc2021-prd",
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
                              responseTitle = _.get(responseUser, 'Item.Name', 'Nothinfg');
                              responseWash = responseTitle.toString();

                              //
                              responseDescription = _.get(responseUser, 'Item.codLab', 'Nothinfg');
                              responseWashDescription = responseDescription.toString();
                              //
                              responseCategory = _.get(responseUser, 'Item.dateInitial', 'Nothinfg');
                              responseWashCategory = responseCategory.toString();
                              //
                              responseId = _.get(responseUser, 'Item.price', 'Nothinfg');
                              responseWashId = responseId.toString();
                              //
                              responsePrice = _.get(responseUser, 'Item.status', 'Nothinfg');
                              responseWashPrice = responsePrice.toString();
                              console.log(responseWash);
                              //
                              responseSubTitle = _.get(responseUser, 'Item.useriD', 'Nothinfg');
                              responseWashSubTitle = responseSubTitle.toString();

                              let awsConfig2 = {
                                region: "us-east-1",
                                accessKeyId: "AKIA564XY3QK6GKEQWUS",
                                secretAccessKey:
                                  "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",
                              };
                              AWS.config.update(awsConfig2);

                              let dynamodb = new AWS.DynamoDB();

                              const params = {
                                Item: {
                                  id: {
                                    S: id,
                                  },
                                  Name: {
                                    S: responseWash,
                                  },
                                  codHouse: {
                                    S: responseWashDescription,
                                  },
                                  codLab: {
                                    S: responseCodHouse,
                                  },
                                  price: {
                                    S: responseWashId,
                                  },
                                  useriD: {
                                    S: responseWashSubTitle,
                                  },
                                  dateInitial: {
                                    S: responseWashCategory,
                                  },
                                  status: {
                                    S: responseWashPrice,
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
                                else console.log('Sucesso!!'); // successful response
                              });
                              //       
                            }
                          })
                        }

                        fetchOneByKeyAdress();
                      }
                      cognitoListUser(data[tamanh].id, data[tamanh].codHouse);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
            actions={[
              {
                icon: "update",
                tooltip: "Update",
                onClick: (event, rowData) => {
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
                          S: 'No Prazo',
                        },
                        deadline: {
                          S: rowData.deadline,
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
                          S: "4",
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
                      if (err) console.log(err, err.stack);
                      // an error occurred
                      else alert('Sucesso'); // successful response
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
