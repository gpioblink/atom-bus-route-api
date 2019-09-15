import * as express from 'express';
import SearchQuery from '@/models/entities/SearchQuery';
import * as bodyParser from 'body-parser';
import SearchByBizAPI from '@/logics/api/SearchByBizAPI';
const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World! Please use /searchBusRoute'));

app.post('/searchBusRoute', async (req, res) => {
  const query: SearchQuery = req.body;
  console.log(req.body);
  const result = await SearchByBizAPI.searchRoute(query);
  console.log(result);
  res.send(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
