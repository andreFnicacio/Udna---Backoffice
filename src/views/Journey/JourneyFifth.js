import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import MaterialTable from 'material-table';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import AWS from 'aws-sdk';

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
  const [codAct, setcodAct] = useState("");
  const [codLab, setcodLab] = useState("");
  const [sdate, setsdate] = useState("");
  const [kpdate, setkpdate] = useState("");
  const [dbfarr, setdbfarr] = useState("");
  const [status1, setstatus1] = useState("");
  const [status2, setstatus2] = useState("");
  const [useriD, setuseriD] = useState("");
  const [doeitle, setdoeitle] = useState("");
  const [kddttc, setkddttc] = useState("");
  const [rfdelai, setrfdelai] = useState("");
  const [rrdate, setrrdate] = useState("");
  const [ssdate, setssdate] = useState("");
  const [responseCPF, setResponseCPF] = useState("14939349705")
  const [data, setData] = useState("");

  const [state, setState] = React.useState({});
  const DateLaudo = Date().toLocaleString();

  function callToData() {
    let awsConfig2 = {
      region: "us-east-1",
      accessKeyId: "AKIA564XY3QK6GKEQWUS",
      secretAccessKey: "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",
    };

    AWS.config.update(awsConfig2);

    var params = {
      TableName: "StatusEsvix-2021",
      FilterExpression: "statusJourney = :this_category",
      ExpressionAttributeValues: { ":this_category": "5" },
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
            { title: "Date", field: "sdate" },
            {title: "Trfa.atrasada",field: "state"},
            { title: "Enviar Laudo", render: (rowData) => { 
              return(
              <Button>
              <input type="file" id="file" name="file" />
              <input
                type="submit"
                id="submit"
                onClick={() => {
                  const getFileName = document.getElementById("file");
                  const fileName = getFileName.files;

                  function addFileToS3() {
                    const albumBucketName =
                      "udnas3prd-prd/public/Reports/" +
                      rowData.useriD +
                      "/Laudos Genéticos";
                    const bucketRegion = "us-east-1";
                    const IdentityPoolId = "4o2lknetb5bnl8uocu1304edoo";
  
                    let awsConfig2 = {
                      region: "us-east-1",
                      accessKeyId: "AKIA564XY3QK6GKEQWUS",
                      secretAccessKey: "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",
                    };
  
                    AWS.config.update(awsConfig2);
  
                    const s3 = new AWS.S3();
  
                    const upload = async (fileName, body, cpf) => {
                      const params = {
                        ACL: "public-read",
                        Body: body,
                        ContentType: "application/pdf",
                        Bucket:
                          "udnas3prd-prd/public/Reports/" +
                          rowData.useriD +
                          "/Laudos Genéticos",
                        Key: "Laudo",
                      };
  
                      function addFileToDynamoDB() {
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
                              S: rowData.useriD,
                            },
                            Laudo: {
                              S: "Laudo",
                            },
                            Date: {
                              S: DateLaudo,
                            }
                          },
                          ReturnConsumedCapacity: "TOTAL",
                          TableName: "LaudosApp-exVix2021marc",
                        };
                        dynamodb.putItem(params, function (err, data) {
                          if (err) console.log(err, err.stack);
                          // an error occurred
                          else console.log(data); // successful response
                        });                    
                      }
                      addFileToDynamoDB();
                      
                      return await new Promise((resolve, reject) => {
                        s3.putObject(params, (err, results) => {
                          if (err)
                            console.log(err)
                          else alert("Laudo enviado com Sucesso!!");
                        });
                      });
                    };
  
                    upload(fileName, responseCPF);
                  }
      
  
                  addFileToS3();
                }}
              />
            </Button>
              );      
              } },
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
            title="Laudo"
            columns={state.columns}
            data={state.data}
            editable={{
              onBulkUpdate: changes => 
              new Promise((resolve, reject) => {
                  setTimeout(() => {
                      setState([...data, changes]); 
                      function cognitoListUser(id, responseCodHouse, responseDeadLine, responseStatus, responsenmroProtocolo){
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
                                        S: responseCodHouse,
                                      },
                                      deadline: {
                                        S: responseDeadLine,
                                      },
                                      codLab: {
                                        S: responseWashDescription,
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
                                      statusPrazo: {
                                        S: responseStatus,
                                      },
                                      prazo: {
                                        S: responsePrazo,
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
                                    else alert("Succes!!"); // successful response
                                  });
                                         
                                }
                            })
                        }
                      
                      fetchOneByKeyAdress();                      
                      }

                      const responseSuccesAdress = JSON.stringify(changes, null, 2);
                      let responseSucces = JSON.parse(responseSuccesAdress);
                      let responseId = _.get(responseSucces, "0.newData.id", "Nothinfg");
                      let responseCodHouse = _.get(responseSucces, "0.newData.codHouse", "Nothinfg");
                      let responseDeadLine = _.get(responseSucces, "0.newData.deadLine", "Nothinfg");
                      let responseStatus = _.get(responseSucces, "0.newData.statusPrazo", "Nothinfg");
                      let responsePrazo = _.get(responseSucces, "0.newData.prazo", "Nothinfg");
                      let responsenmroProtocolo = _.get(responseSucces, "0.newData.nmroProtocolo", "Nothinfg");
                      
                      cognitoListUser(responseId, responseCodHouse, responseDeadLine, responseStatus, responsePrazo, responsenmroProtocolo);
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
                          state: {
                            S: rowData.state,
                          },
                          state: {
                            S: rowData.sdate,
                          },
                          statusJourney: {
                            S: "6",
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
