import * as express from 'express';
import SearchQuery from '@/models/entities/SearchQuery';
import * as bodyParser from 'body-parser';
import SearchByBizAPI from '@/logics/api/SearchByBizAPI';
import GeocodingAPI from '@/logics/api/GeocodingAPI';
import SearchBusRouteBeyondTheCompany from './logics/api/SearchBusRouteBeyondTheCompany';

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
  const result = await SearchBusRouteBeyondTheCompany.searchRoute(query);
  console.log(result);
  res.send(result);
});

app.get('/test/findPlaceGrid', async (req, res) => {
  let name = '';
  if (req.query.name) {
    name = req.query.name;
  }
  const result = await GeocodingAPI.getDEGWorldGridFromPlaceName(name);
  res.send(result);
});

app.get('/test/findPlaceGridJorudan', async (req, res) => {
  let name = '';
  if (req.query.name) {
    name = req.query.name;
  }
  const result = await SearchByBizAPI.getDEGWorldGridFromPlaceName(name);
  res.send(result);
});

app.get('/test/getStationList', async (req, res) => {
  let name = '';
  if (req.query.name) {
    name = req.query.name;
  }
  const result = await SearchByBizAPI.getFullBusStationNameListByPlaceName(name);
  res.send(result);
});

app.get('/test/getStationListGrid', async (req, res) => {
  let lat = 0;
  if (req.query.lat) {
    lat = req.query.lat;
  }
  let lng = 0;
  if (req.query.lng) {
    lng = req.query.lng;
  }

  const result = await SearchByBizAPI.getNearestFullBusStationNameListByGrid({ lat, lng });
  res.send(result);
});

app.get('/test/getFullStationName', async (req, res) => {
  let name = '';
  if (req.query.name) {
    name = req.query.name;
  }
  const result = await SearchBusRouteBeyondTheCompany.findFullStationNameList(name);
  res.send(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
