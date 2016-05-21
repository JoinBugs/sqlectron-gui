import { db } from 'sqlectron-core';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();


app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

let serverSession;
let dbConn;

app.post('/query', async (req, res) => {
  console.log('>>>request', req.body.query);
  /* eslint quotes:0,comma-dangle:0 */
  const serverInfo = {
    "id": "d474c16e-c1aa-4aa2-90db-4416e239de55",
    "name": "cloud-02 [dev]",
    "client": "mysql",
    "host": "172.17.42.1",
    "port": 3306,
    "socketPath": null,
    "user": "root",
    "password": "8Rnl5wrMfF",
    "database": "develop_bravi-cloud-oauth2",
    "ssh": {
      "host": "cloud-02.bravi.com.br",
      "port": 22,
      "user": "core",
      "password": null,
      "privateKey": "~/.ssh/id_rsa"
    },
    "ssl": false
  };

  console.log('>>>1');
  if (!serverSession) {
    serverSession = db.createServer(serverInfo);
  }
  console.log('>>>2');
  if (!dbConn) {
    dbConn = serverSession.createConnection(serverInfo.database);
  }
  console.log('>>>3');
  await dbConn.connect();
  console.log('>>>4');

  await dbConn.executeQuery(req.body.query);
  console.log('>>>5');

  // await serverSession.end();
  // console.log('>>>6');

  res.send([]);
});

export function start() {
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}
