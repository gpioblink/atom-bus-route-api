import SearchQuery from '@/models/entities/SearchQuery';
import SearchByBizAPI from '@/logics/api/SearchByBizAPI';
import Grid from '@/models/entities/Grid';
import GeocodingAPI from '@/logics/api/GeocodingAPI';
import { Route } from '@/models/entities/Route';
import ApiResultError from '@/models/entities/ApiResultError';
import SearchQueryGridFrom from '@/models/entities/SearchQueryGridFrom';

// apiというディレクトリの中にいるが実質このclassが他のapiを叩いているように見える
// 外部の物を叩く場合は特にそうだけど、階層と抽象度を揃えたほうがいいと思う
// でないと、こんな感じでアプリケーション固有のロジックと外部のapiとの接続が絡み合って複雑化してしまうし、
// テスト不可能になってしまい、本当にテストを最優先でしなければいけない固有ロジックを見失いがち,
// 
// ガード節を意識した、早期リターンをしているのはとてもいいと思う
// あとは処理のまとまりを意識して空行を入れていけるともっといいと思う！

export default class SearchBusRouteBeyondTheCompany {
  static async searchRoute(query: SearchQuery) {
    const fullFromList = await SearchBusRouteBeyondTheCompany.findFullStationNameList(query.from);
    // if文の書式を統一したほうがいいので、個人的には{}をつけたほうが好み
    if ((fullFromList as ApiResultError).error) return fullFromList;
    const fullToList = await SearchBusRouteBeyondTheCompany.findFullStationNameList(query.to);
    
    if ((fullToList as ApiResultError).error) return fullToList;
    const result = await SearchBusRouteBeyondTheCompany.execBulkRouteSearch(
      fullFromList as string[],
      fullToList as string[],
      query
    );
    if (!result.length) return { error: '該当のルートが見つかりませんでした' } as ApiResultError;
    return result;
  }

  static async searchRouteFromGrid(query: SearchQueryGridFrom) {
    const fullFromList = await SearchBusRouteBeyondTheCompany.findFullStationNameListGrid({
      lat: Number(query.fromLat),
      lng: Number(query.fromLng)
    });
    if ((fullFromList as ApiResultError).error) return fullFromList;
    const fullToList = await SearchBusRouteBeyondTheCompany.findFullStationNameList(query.to);
    if ((fullToList as ApiResultError).error) return fullToList;
    const result = await SearchBusRouteBeyondTheCompany.execBulkRouteSearch(
      fullFromList as string[],
      fullToList as string[],
      { from: 'dammy', to: 'dammy', date: query.date, useDateAs: query.useDateAs }
    );
    if (!result.length) return { error: '該当のルートが見つかりませんでした' } as ApiResultError;
    return result;
  }

  static async execBulkRouteSearch(fromList: string[], toList: string[], originalQuery: SearchQuery) {
    let routeList: Route[] = [];
  // ここはmapとかforEachとかで置き換えれそう
    for (const from of fromList) {
      for (const to of toList) {
        const query = originalQuery;
        query.from = from;
        query.to = to;

        const result = await SearchByBizAPI.searchRoute(query);
        for (const route of result) {
          route.id = Number(route.id) + routeList.length;
        }
        routeList = routeList.concat(result);
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

    return routeList;
  }

  static async findFullStationNameList(inputName: string): Promise<string[] | ApiResultError> {
    const try1 = await SearchByBizAPI.getFullBusStationNameListByPlaceName(inputName);
    if (try1.length) return try1;

    // let try2: Grid | {} = await SearchByBizAPI.getDEGWorldGridFromPlaceName(inputName);
    // if (!(try2 as Grid).lat) {
    //   try2 = await GeocodingAPI.getDEGWorldGridFromPlaceName(inputName);
    // }
    const try2 = await GeocodingAPI.getDEGWorldGridFromPlaceName(inputName);
    if (!(try2 as Grid).lat) return { error: '場所を特定できませんでした' };

    const try3 = await SearchByBizAPI.getNearestFullBusStationNameListByGrid(try2 as Grid);
    if (!try3.length) return { error: 'ルート上付近のバス停が見つかりませんでした' };
    return try3;
  }

  static async findFullStationNameListGrid(grid: Grid): Promise<string[] | ApiResultError> {
    const try3 = await SearchByBizAPI.getNearestFullBusStationNameListByGrid(grid as Grid);
    if (!try3.length) return { error: 'ルート上付近のバス停が見つかりませんでした' };
    return try3;
  }
}
