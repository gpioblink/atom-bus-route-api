import SearchQuery from '@/models/entities/SearchQuery';
import * as moment from 'moment-timezone';
import axios from 'axios';
import CommonOutput from '@/models/entities/jorudan/CommonOutput';
import SearchRouteOutput from '@/models/entities/jorudan/SearchRouteOutput';
import JorudanRouteFormat from '@/models/entities/jorudan/JorudanRouteFormat'; // 使ってない？
import { Route } from '@/models/entities/Route';
import Grid from '@/models/entities/Grid';
import SearchLandmarkOutput from '@/models/entities/jorudan/SearchLandmarkOutput';
import SearchStationNameOutput from '@/models/entities/jorudan/SearchStationNameOutput';

export default class SearchByBizAPI {
  static async searchRoute(query: SearchQuery) {
    // タイムゾーン指定とかはアプリケーション起動時にやっておいたほうが安全
    moment.tz.setDefault('Asia/Tokyo');

    // 以下でクライアントの生成ロジックが含まれているし、各apiクライアント用のclassで生成しているので、同じエンドポイントは一箇所で生成して、決められたルールを与えられたほうがいいので
    // axiosのclientを作成してそれを使ったほうがよさそう(axios.create)
    // そして、そうしておくと簡単にクライアントをテスト用と本番用を変更できたりする
    const BASEURI = process.env.JOLDAN_ENDPOINT;
    const API_KEY = process.env.JOLDAN_BIZ_API_KEY;
    const FUNC_NAME = 'sr.cgi';

    // このリクエスト生成は別関数で隠蔽し他方がよさそう
    const REQUEST_URL = `${BASEURI}/${FUNC_NAME}?f=1&ak=${API_KEY}&eki1=${encodeURI(query.from)}&eki2=${encodeURI(
      query.to
    )}&kbn1=B&kbn2=B&opt3=${query.useDateAs}&opt4=1&rm=TasyaBus=On&date=${encodeURI(
      moment(Number(query.date)*1000).format('YYYYMMDD')
    )}&time=${encodeURI(moment(Number(query.date)*1000).format('hhmm'))}`;

    const result = await axios.get(REQUEST_URL);
    // SearchRouteOutputを返すまでの一連の流れを関数で分けて隠蔽したほうが良い 
    const apiResult = result.data as CommonOutput;
    const apiBody = apiResult.NorikaeBizApiResult.body as SearchRouteOutput;
    if (!apiBody.num) {
      return [];
    }

    return SearchByBizAPI.sanitizeResult(apiBody);
  }

  static async getDEGWorldGridFromPlaceName(placeName: string) {
    const BASEURI = process.env.JOLDAN_ENDPOINT;
    const API_KEY = process.env.JOLDAN_BIZ_API_KEY;
    const FUNC_NAME = 'sl.cgi';

    const REQUEST_URL = `${BASEURI}/${FUNC_NAME}?f=1&ak=${API_KEY}&opt1=${encodeURI(placeName)}`;
    console.log(`GET: ${REQUEST_URL}`);

    const result = await axios.get(REQUEST_URL);
    const apiResult = result.data as CommonOutput;
    const apiBody = apiResult.NorikaeBizApiResult.body as SearchLandmarkOutput;
    if (!apiBody.num || !apiBody.item.length) {
      console.log(`no results was found.`);
      return {};
    }

    const grid: Grid = {
      lat: SearchByBizAPI.convertJorudanDMS2DEG(apiBody.item[0].y),
      lng: SearchByBizAPI.convertJorudanDMS2DEG(apiBody.item[0].x)
    };
    console.log(`${grid.lat},${grid.lng} is the location.`);
    return grid;
  }

  static async getFullBusStationNameListByPlaceName(placeName: string) {
    const BASEURI = process.env.JOLDAN_ENDPOINT;
    const API_KEY = process.env.JOLDAN_BIZ_API_KEY;
    const FUNC_NAME = 'sen.cgi';

    const REQUEST_URL = `${BASEURI}/${FUNC_NAME}?f=1&ak=${API_KEY}&eki1=${encodeURI(placeName)}`;
    console.log(`GET: ${REQUEST_URL}`);

    const result = await axios.get(REQUEST_URL);
    const apiResult = result.data as CommonOutput;
    const apiBody = apiResult.NorikaeBizApiResult.body as SearchStationNameOutput;
    if (!apiBody.num || !apiBody.eki.length) {
      console.log(`no results was found.`);
      return [];
    }

    const stationList: string[] = [];
    for (const station of apiBody.eki) {
      if (station.kubun === 'B' && stationList.length < 4) {
        // 区分が路線バスなら
        stationList.push(`${station.name}`); // なぜか急に社名もでるようになった
        // stationList.push(`${station.name}〔${station.company}〕`);
      }
    }

    console.log(`found ${stationList.length} bus stop(s)`);
    return stationList;
  }

  static async getNearestFullBusStationNameListByGrid(grid: Grid) {
    const BASEURI = process.env.JOLDAN_ENDPOINT;
    const API_KEY = process.env.JOLDAN_BIZ_API_KEY;
    const FUNC_NAME = 'sne.cgi';

    const REQUEST_URL = `${BASEURI}/${FUNC_NAME}?f=1&ak=${API_KEY}&opt1=${grid.lng}&opt2=${grid.lat}&opt3=99999999&opt4=1&opt5=3&max=10`;
    console.log(`GET: ${REQUEST_URL}`);

    const result = await axios.get(REQUEST_URL);
    const apiResult = result.data as CommonOutput;
    const apiBody = apiResult.NorikaeBizApiResult.body as SearchStationNameOutput;
    if (!apiBody.num || !apiBody.eki.length) {
      console.log(`no results was found.`);
      return [];
    }

    const stationList: string[] = [];
    for (const station of apiBody.eki) {
      if (station.kubun === 'B' && stationList.length < 4) {
        // 区分が路線バスなら
        stationList.push(`${station.name}〔${station.company}〕`);
      }
    }
    console.log(`found ${stationList.length} bus stop(s)`);
    return stationList;
  }

  static convertJorudanDMS2DEG(jorudanDmsString: string): number {
    const [deg, min, sec, msec] = jorudanDmsString.split(',');
    const secmsec = Number(sec) + Number(msec) * 0.001;
    return Math.round((Number(deg) + Number(min) / 60.0 + Number(secmsec) / 3600.0) * 1000000) / 1000000;
  }

  static sanitizeResult(apiBody: SearchRouteOutput) {
    const routes: Route[] = [];
    for (const route of apiBody.route) {
      routes.push(new Route(route));
    }
    return routes;
  }
}

