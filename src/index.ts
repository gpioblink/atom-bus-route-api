import * as express from 'express';
import SearchQuery from '@/models/entities/SearchQuery';
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World! Please use /searchBusRoute'));

app.post('/searchBusRoute', (req, res) => {
  const query: SearchQuery = req.body;
  res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
