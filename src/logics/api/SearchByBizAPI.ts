import SearchQuery from '@/models/entities/SearchQuery';
import * as moment from 'moment';
import axios from 'axios';
import CommonOutput from '@/models/entities/jorudan/CommonOutput';
import SearchRouteOutput from '@/models/entities/jorudan/SearchRouteOutput';
import JorudanRouteFormat from '@/models/entities/jorudan/JorudanRouteFormat';
import { Route } from '@/models/entities/Route';

export default class SearchByBizAPI {
  static async searchRoute(query: SearchQuery) {
    const BASEURI = process.env.JOLDAN_ENDPOINT;
    const API_KEY = process.env.JOLDAN_BIZ_API_KEY;
    const FUNC_NAME = 'sr.cgi';

    const REQUEST_URL = `${BASEURI}/${FUNC_NAME}?f=1&ak=${API_KEY}&eki1=${encodeURI(query.from)}&eki2=${encodeURI(
      query.to
    )}&kbn1=B&kbn2=B&opt3=3&opt4=1&rm=TasyaBus=On&date=${encodeURI(moment(query.date).format('YYYYMMDD'))}`;

    console.log(`GET: ${REQUEST_URL}`);

    const result = await axios.get(REQUEST_URL);
    const apiResult = result.data as CommonOutput;
    const apiBody = apiResult.NorikaeBizApiResult.body as SearchRouteOutput;
    if(!apiBody.num){
      console.log(`no results was found.`);
      return [];
    }
    console.log(`${apiBody.num} result(s) was found.`);
    return SearchByBizAPI.sanitizeResult(apiBody);
  }

  static sanitizeResult(apiBody: SearchRouteOutput) {
    const routes: Route[] = [];
    for (const route of apiBody.route) {
      routes.push(new Route(route));
    }
    return routes;
  }
}
