import SearchQuery from '@/models/entities/SearchQuery';
import SearchByBizAPI from '@/logics/api/SearchByBizAPI';
import Grid from '@/models/entities/Grid';
import GeocodingAPI from '@/logics/api/GeocodingAPI';
import { Route } from '@/models/entities/Route';

export default class SearchBusRouteBeyondTheCompany {
  static async searchRoute(query: SearchQuery) {
    const fullFromList = await SearchBusRouteBeyondTheCompany.findFullStationNameList(query.from);
    const fullToList = await SearchBusRouteBeyondTheCompany.findFullStationNameList(query.to);
    return SearchBusRouteBeyondTheCompany.execBulkRouteSearch(fullFromList, fullToList, query.date);
  }

  static async execBulkRouteSearch(fromList: string[], toList: string[], date: Date) {
    let routeList: Route[] = [];
    for (const from of fromList) {
      for (const to of toList) {
        const query = { from, to, date };
        console.log(query);
        routeList = routeList.concat(await SearchByBizAPI.searchRoute(query));
      }
    }

    // 重複判定のためキーで管理。価格・時刻・距離が全て同じルートを削除
    const routeObj: any = {};
    for (const route of routeList) {
      routeObj[`${route.price}/${route.time}/${route.distance}`] = route;
    }
    routeList = [];
    for (const key in routeObj) {
      routeList.push(routeObj[key]);
    }

    console.log(`total ${routeList.length} results found`);
    return routeList;
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
