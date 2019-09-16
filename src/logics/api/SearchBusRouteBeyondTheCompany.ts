import SearchQuery from '@/models/entities/SearchQuery';
import SearchByBizAPI from '@/logics/api/SearchByBizAPI';
import Grid from '@/models/entities/Grid';
import GeocodingAPI from '@/logics/api/GeocodingAPI';

export default class SearchBusRouteBeyondTheCompany {
  static async searchRoute(query: SearchQuery) {}

  static async execBulkRouteSearch(inputName: string) {
    
  }

  static async findFullStationNameList(inputName: string): Promise<string[]> {
    const try1 = await SearchByBizAPI.getFullBusStationNameListByPlaceName(inputName);
    if (try1.length) return try1;

    let try2: Grid | {} = await SearchByBizAPI.getDEGWorldGridFromPlaceName(inputName);
    if (!(try2 as Grid).lat) {
      try2 = await GeocodingAPI.getDEGWorldGridFromPlaceName(inputName);
    }
    if (!(try2 as Grid).lat) return [];

    const try3 = await SearchByBizAPI.getNearestFullBusStationNameListByGrid(try2 as Grid);
    return try3;
  }
}
