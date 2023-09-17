import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
// core components
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AWS from "aws-sdk";

let rowDatas;

const _ = require("lodash");

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
  buttonModal: {},
  closeModal: {
    marginRight: "150",
  },

  paper: {
    position: "relative",
    width: 200,
    height: 400,
    backgroundColor: "#f2f2f2",
    display:'flex',
  },

  containerModal:{
    marginRight:-10,
    marginLeft:-10,
    backgroundColor: "#f2f2f2",
    width: 220,
    height:400,
  },

  GridContainer: {
    marginTop: "15px",
    borderRadius: "10",
  },
  Label:{
    height:50
  },
  titleLabel:{
    marginTop:'-5px',
    marginBottom:'-5px',
    marginRight:'-5px',
  },
};

const useStyles = makeStyles(styles);

export default function Jorney() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
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
  const [data, setData] = useState();
  const [title, setTitle] = useState('')
  let now = Date();

  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let responseLaudoId;
  let responseWashLaudoId;

  let responseLaudo;
  let responseWashLaudo;

  let responseData;
  let responseWashData;

  let responseSuccesLaudo;

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
      ExpressionAttributeValues: { ":this_category": "4" },
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
            { title: "Trfa.atrasada", field: "state" },
          ],
          data: data.Items,
        });
      }
      console.log(state.data);
    });
  }
  callToData();

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.containerModal}>
        <div className={classes.Lab}>
          <h6 className={classes.cardTitleBlack}></h6>
      
          <h4>Edição da jornada</h4>
          
          <div className={classes.Label}>
          <h6 className={classes.titleLabel}>Codigo Laboratorio</h6>
          
          </div>
          <input onChange={event => setTitle(event.target.value)}/>
          <input
            type="submit"
            id="submit"
            onClick={() => {
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
                    S: data.id,
                  },
                  userid: {
                    S: data.userid,
                  },
                  nkit: {
                    S: data.nkit,
                  },
                  codLab: {
                    S: title,
                  },
                  deadline: {
                    S: data.deadline,
                  },
                  state: {
                    S: data.state,
                  },
                  statusJourney: {
                    S: "4",
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
                else alert('Sucesso!!'); // successful response
              });
             }}
          />
          </div>
        
        
      </div>
      <div className={styles.closeModal}>
        <button onClick={handleClose}>X</button>
      </div>
    
    </div>
  );
  

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}></h4>
          </CardHeader>
          <MaterialTable
            title="Transporte Lab"
            columns={state.columns}
            data={state.data}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      let data = [...prevState.data];
                      data.push(newData);
                      console.log(data);
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
                            S: "1",
                          },
                          codLab: {
                            S: data[tamanh].codLab,
                          },
                          state: {
                            S: "No Prazo",
                          },
                          deadline: {
                            S: data[tamanh].deadline,
                          },
                          statusJourney: {
                            S: "1",
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

                      function cognitoListUser(id, responseCodLab) {
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
                          region: "us-east-1",
                          accessKeyId: "AKIA564XY3QK6GKEQWUS",
                          secretAccessKey:
                            "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",
                        };
                        AWS.config.update(awsConfig2);

                        const docClient = new AWS.DynamoDB.DocumentClient();
                        const fetchOneByKeyAdress = function () {
                          var params = {
                            TableName: "PayTable-esVixmarc2021-prd",
                            Key: {
                              id: id,
                            },
                          };
                          docClient.get(params, function (err, data) {
                            if (err) {
                              const responseError = typeof JSON.stringify(
                                err,
                                null,
                                2
                              );
                              console.log(responseError);
                            } else {
                              const responseSuccesAdress = JSON.stringify(
                                data,
                                null,
                                2
                              );
                              responseUser = JSON.parse(responseSuccesAdress);
                              //
                              responseTitle = _.get(
                                responseUser,
                                "Item.Name",
                                "Nothinfg"
                              );
                              responseWash = responseTitle.toString();

                              //
                              responseDescription = _.get(
                                responseUser,
                                "Item.codLab",
                                "Nothinfg"
                              );
                              responseWashDescription = responseDescription.toString();
                              //
                              responseCategory = _.get(
                                responseUser,
                                "Item.dateInitial",
                                "Nothinfg"
                              );
                              responseWashCategory = responseCategory.toString();
                              //
                              responseId = _.get(
                                responseUser,
                                "Item.price",
                                "Nothinfg"
                              );
                              responseWashId = responseId.toString();
                              //
                              responsePrice = _.get(
                                responseUser,
                                "Item.status",
                                "Nothinfg"
                              );
                              responseWashPrice = responsePrice.toString();
                              console.log(responseWash);
                              //
                              responseSubTitle = _.get(
                                responseUser,
                                "Item.useriD",
                                "Nothinfg"
                              );
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
                                  codLab: {
                                    S: responseCodLab,
                                  },
                                  codHouse: {
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
                                else console.log("Sucesso!!"); // successful response
                              });
                              //
                            }
                          });
                        };

                        fetchOneByKeyAdress();
                      }
                      cognitoListUser(data[tamanh].id, data[tamanh].codLab);
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
                  alert("Parabens, Jornada concluida :D " + rowData.id);
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
                          S: rowData.id || "No Prazo!!",
                        },
                        codLab: {
                          S: rowData.codLab || "No Prazo!!",
                        },
                        state: {
                          S: "No Prazo",
                        },
                        deadline: {
                          S: rowData.deadline || "No Prazo!!",
                        },
                        delay: {
                          S: "1",
                        },
                        nkit: {
                          S: rowData.nkit || "No Prazo!!",
                        },
                        sdate: {
                          S: rowData.sdate || "No Prazo!!",
                        },
                        statusJourney: {
                          S: "5",
                        },
                        userid: {
                          S: rowData.userid || "No Prazo!!",
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
                      else alert("Sucesso"); // successful response
                    });
                  }
                  addFileToDynamoDB();
                },
              },
              {
                icon: "edit",
                tooltip: "Edição",
                onClick: (event, rowData) => {
                   setData(rowData);
                  handleOpen();
                },
              },
            ]}
          />
          <div>
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Enviar-Informações"
                aria-describedby="Id-cliente_rastreio-casa-lab"
              >
                {body}
              </Modal>
            </div>
          </div>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
