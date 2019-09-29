import * as md5 from 'md5';
import Grid from '@/models/entities/Grid';
import JorudanTransitPointFormat from '@/models/entities/jorudan/JorudanTransitPointFormat';
import * as moment from 'moment-timezone';

export class TransferPoint {
  static readonly methodTable = [
    'JR在来線',
    '私鉄在来線',
    '地下鉄',
    '路面電車',
    '徒歩',
    '路線バス',
    '飛行機',
    '船',
    '有料特急列車',
    '新幹線',
    '寝台列車',
    '有料急行列車',
    '高速バス'
  ];

  id: number;
  routeName: string;
  from: string;
  to: string;

  distance100m: number;

  timeMin: number;
  timeToWaitMin: number;
  timeToRideMin: number;

  method: string;
  routeColorRGB: string;

  fromDate: string;
  toDate: string;
  price: number;

  // get calcHash(): string {
  //   return md5(`${this.name}-${this.company}(${this.grid.lat},${this.grid.lng})`);
  // }

  constructor(jorudanTransitPoint: JorudanTransitPointFormat) {
    moment.tz.setDefault('Asia/Tokyo');

    this.id = jorudanTransitPoint.id;
    this.routeName = jorudanTransitPoint.rosen;
    this.from = jorudanTransitPoint.from;
    this.to = jorudanTransitPoint.to;
    this.method = TransferPoint.methodTable[Number(jorudanTransitPoint.rosenSyubetu)];
    this.distance100m = jorudanTransitPoint.kyori;

    this.timeMin = jorudanTransitPoint.jikan;
    this.timeToRideMin = jorudanTransitPoint.idou;
    this.timeToWaitMin = jorudanTransitPoint.mati;

    this.price = jorudanTransitPoint.untin;

    // console.log(`${jorudanTransitPoint.fromDate} ${jorudanTransitPoint.fromTime}`);
    this.fromDate = String(moment(
      `${jorudanTransitPoint.fromDate}/${Number(jorudanTransitPoint.fromTime).toString().padStart(4, '0')}`,
      'YYYYMMDD/hhmm',
      true
    ).unix());

    this.toDate = String(moment(`${jorudanTransitPoint.toDate} ${Number(jorudanTransitPoint.toTime).toString().padStart(4, '0')}`, 'YYYYMMDD hhmm', true).unix());

    this.routeColorRGB = jorudanTransitPoint.lineColor.rgb[0];
  }
}
