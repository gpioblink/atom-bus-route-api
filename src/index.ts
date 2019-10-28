import * as express from 'express';
import SearchQuery from '@/models/entities/SearchQuery';
import * as bodyParser from 'body-parser';
import SearchByBizAPI from '@/logics/api/SearchByBizAPI';
import GeocodingAPI from '@/logics/api/GeocodingAPI';
import SearchBusRouteBeyondTheCompany from './logics/api/SearchBusRouteBeyondTheCompany';
import SearchQueryGridFrom from './models/entities/SearchQueryGridFrom';

const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => res.send('Hello World! Please use /searchBusRoute'));

app.post('/searchBusRoute', async (req, res) => {
  const query: SearchQuery = req.body;
  if (!query.useDateAs) query.useDateAs = 3;
  console.log(req.body);
  const result = await SearchBusRouteBeyondTheCompany.searchRoute(query);
  console.log(result);
  res.send(result);
});

app.post('/searchBusRouteGridFrom', async (req, res) => {
  const query: SearchQueryGridFrom = req.body;
  if (!query.useDateAs) query.useDateAs = 1;
  console.log(req.body);
  const result = await SearchBusRouteBeyondTheCompany.searchRouteFromGrid(query);
  console.log(result);
  res.send(result);
});

app.get('/test/findPlaceGrid', async (req, res) => {
  // この処理隠蔽できそう
  // const name = getNameByRequest(req)
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
