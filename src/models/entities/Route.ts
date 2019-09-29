import { TransferPoint } from '@/models/entities/TransferPoint';
import JorudanRouteFormat from '@/models/entities/jorudan/JorudanRouteFormat';

type flagType = { isFast: boolean; isCheap: boolean; isEasy: boolean };

export class Route {
  price: number; // 費用
  time: number; // 所要時間
  distance: number; // 距離
  flags: flagType; // 早・安・楽
  path: TransferPoint[];
  id: number;
  transitPoints: number; // 乗り換え回数

  constructor(jorudanRoute: JorudanRouteFormat) {
    this.id = jorudanRoute.id;
    this.price = jorudanRoute.hyouka.hiyou;
    this.time = jorudanRoute.hyouka.jikan;
    this.distance = jorudanRoute.hyouka.kyori;
    this.flags = {
      isFast: Boolean(Number(jorudanRoute.hyouka.status.hayai)),
      isCheap: Boolean(Number(jorudanRoute.hyouka.status.yasui)),
      isEasy: Boolean(Number(jorudanRoute.hyouka.status.raku))
    };
    this.transitPoints = jorudanRoute.hyouka.norikaeCnt;

    this.path = [];
    for (const path of jorudanRoute.path) {
      this.path.push(new TransferPoint(path));
    }
  }
}
