import AWS from 'aws-sdk'
import * as Path from 'path'
import * as Fs from 'fs'


export default function lambdaSetFile(cpf,body){
    const lambda = new AWS.Lambda({region: "us-east-1"});
    const data = {
      "fileName": "Laudo Genético Resultado.pdf",
      "cpf":cpf,
      "body":body
    };
    const dataPayload = JSON.stringify(data)

    const upload = async () => {
        return await new Promise((resolve, reject) =>{
          const params = {
              FunctionName: 'worn-off-keys-s3-upload',
              InvocationType: "RequestResponse",
              Payload: dataPayload,
          };
        
          lambda.invoke(params, (err, results) => {
            if (err) console.log("Error"+err);
            else resolve(results);
          });

      });
    };

    upload();

  }