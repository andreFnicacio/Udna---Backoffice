import React , {useState, Component} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

//import '.../complement/teste/App.css';
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Table from "components/Table/Table.js";
import FlatList from 'flatlist-react';
import MaterialTable from 'material-table';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {
  responseSuccesUser,
  responseSucces,
} from "components/Navbars/DataSetJson.js";
import AWS from "aws-sdk";
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
    color: "black",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleBlack: {
    color: "#000000",
    marginTop: "5px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#000",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  buttonModal: {},
  closeModal: {
    marginRight: "150",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: 5,
    padding: 20,
  },
  Tracking: {},
  Laudo: {
    backgroundColor: "#fff",
    borderShadow: "#f2f2f2",
    marginTop: "15px",

    minHeight: "400",
    fontWeight: "200",
  },
  Cliente: {},
  Payment: {},

  Lab: {},
  GridContainer: {
    marginTop: "15px",
    borderRadius: "10",
  },
};




let responseUrl;
let responseWashUrl;

export default function UserProfile() {
  const useStyles = makeStyles(styles);

  const [id, setId] = useState("");
  const [id2, setId2] = useState("x");
  const [name, setName] = useState("");
  const [name2, setName2] = useState("x");
  const [codHouse, setCodHouse] = useState("");
  const [codLab, setCodLab] = useState("");
  const [date, setDate] = useState("");
  const [dateLaudo, setDateLaudo] = useState("");
  const [item, setItemId] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");
  const [examLaudo, setExamLaudo] = useState("");
  const [examId, setExamId] = useState("");

  const [state, setState] = React.useState({});

  const classes = useStyles();
  const responseCPF = _.get(responseSuccesUser, "Item.cpf", "CPF");
  const responseNAME = _.get(responseSuccesUser, "Item.name", "NAME");
  const responseEmail = _.get(responseSuccesUser, "Item.email", "EMAIL");
  const responseCellphone = _.get(
    responseSuccesUser,
    "Item.cellphone",
    "TELEFONE"
  );
  const responseStreet = _.get(responseSucces, "Item.street", "RUA");
  const responseCity = _.get(responseSucces, "Item.city", "CIDADE");
  const responseState = _.get(responseSucces, "Item.stateInitials", "ESTADO");
  const responseBairro = _.get(responseSucces, "Item.neighborhood", "BAIRRO");
  const responseNumber = _.get(responseSucces, "Item.number", "NUM.");
  const responseZipCode = _.get(responseSucces, "Item.zipCode", "COD. POSTAL");
  const [modalStyle] = React.useState(getModalStyle);
  const [historico, setHistorico] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  let awsConfig2 = {
    "region": "us-east-1",
    "accessKeyId": "AKIA564XY3QK6GKEQWUS", "secretAccessKey": "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"
  };
  
  AWS.config.update(awsConfig2);

  const DateLaudo = Date().toLocaleString();
  

  let responseLaudoId;
  let responseWashLaudoId;

  let responseLaudo;
  let responseWashLaudo;

  let responseData;
  let responseWashData;

  let responseSuccesLaudo;


  function callToData(onChoiceItem) {
    let awsConfig2 = {
      "region": "us-east-1",
      "accessKeyId": "AKIA564XY3QK6GKEQWUS", "secretAccessKey": "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"
    };
    
    AWS.config.update(awsConfig2);

    var params = {
      TableName: "PayTable-esVixmarc2021-prd",
      FilterExpression: "useriD = :this_category",
      ExpressionAttributeValues: { ":this_category": onChoiceItem },
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
            { title: 'codHouse', field:'codHouse'},
            { title: 'codLab', field:'codLab'},            
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

  callToData(responseCPF);


///////////////////////////////////////////////////////////


function cognitoListUser(id){
  
  let awsConfig2 = {
    "region": "us-east-1",
    "accessKeyId": "AKIA564XY3QK6GKEQWUS", "secretAccessKey": "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"
  };
  AWS.config.update(awsConfig2);

  const docClient = new AWS.DynamoDB.DocumentClient();
  const fetchOneByKeyAdress = function () {
      var params = {
          TableName: "LaudosApp-exVix2021marc",
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
            responseSuccesLaudo = JSON.parse(responseSuccesAdress)

            responseLaudoId = _.get(responseSuccesLaudo, 'Item.id', 'Nothinfg');
            responseWashLaudoId = responseLaudoId.toString();
            setExamId(responseWashLaudoId);

            //
            responseLaudo = _.get(responseSuccesLaudo, 'Item.Laudo', 'Nothinfg');
            responseWashLaudo = responseLaudo.toString();
            setExamLaudo(responseWashLaudo);

            responseData = _.get(responseSuccesLaudo, 'Item.Date', 'Nothinfg');
            responseWashData = responseData.toString();
            setDateLaudo(responseWashData);
            //       
          }
      })
  }

fetchOneByKeyAdress();

}

cognitoListUser(responseCPF);

console.log(responseWashLaudo);

  var dynamodb = new AWS.DynamoDB();

  let clean = historico.Items

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>PERFIL DO USUÁRIO</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText={responseCPF}
                    id="cpf"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText={responseNAME}
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText={responseEmail}
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText={responseCellphone}
                    id="telefone"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText={responseStreet}
                    id="street"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={responseCity}
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={responseState}
                    id="states"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={responseBairro}
                    id="district"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={1}>
                  <CustomInput
                    labelText={responseNumber}
                    id="number"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText={responseZipCode}
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}></GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">EDITAR</Button>
              <Button color="primary">SALVAR EDIÇÃO</Button>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}> TABELA DE PAGAMENTOS </h4>
            </CardHeader>
            <CardBody>
            <ul> 
            <MaterialTable
              title=" "
              columns={state.columns}
              data={state.data}
            />
 
          </ul>
          <ul> 

            </ul>
              <div>
                <Modal
                  open={open2}
                  onClose={handleClose}
                  aria-labelledby="Enviar-Informações"
                  aria-describedby="Id-cliente_rastreio-casa-lab"
                >
                </Modal>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain color="white">
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>TABELA DE LAUDOS</h4>
            </CardHeader>
            <CardBody>
            <ul> 
            <Table
              tableHeaderColor="primary"
              tableHead={["ID.USER", "ARQUIVO", "DATA DE ENVIO"]}
              tableData={[
                [examId, examLaudo, dateLaudo],
              ]}
            />
            </ul>              
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
