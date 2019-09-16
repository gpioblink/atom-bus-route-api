import CommonOutput from '@/models/entities/jorudan/CommonOutput';
import JorudanRouteFormat from '@/models/entities/jorudan/JorudanRouteFormat';

export default class SearchRouteOutput {
  num: number;
  storeData: string;
  route: [JorudanRouteFormat];
}
