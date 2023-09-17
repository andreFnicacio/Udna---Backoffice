import * as fs from 'fs'

export default function fileBody(fileName){
  const fileBody = fs.readFile(fileName);
  console.log(fileBody);
  return fileBody;
}

