import SearchQuery from '@/models/entities/SearchQuery';
import * as moment from 'moment';

export default class SearchByBizAPI {
  static async searchRoute(query: SearchQuery) {
    const BASEURI = process.env.JOLDAN_ENDPOINT;
    const API_KEY = process.env.JOLDAN_BIZ_API_KEY;
    const FUNC_NAME = 'sr.cgi';
    const result = await fetch(
      `${BASEURI}/${FUNC_NAME}?f=1&ak=${API_KEY}&eki1=${query.from}&eki2=${query.to}&kbn1=B&kbn2=B&date=${moment(
        query.date
      ).format('YYYYMMDD')}`
    );
    const busStation = result.text;
    return busStation;
  }

  // static searchTimeTable() { 
  // }
}
