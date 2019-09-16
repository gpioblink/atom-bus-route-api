import * as md5 from 'md5';
import Grid from '@/models/entities/Grid';
import JorudanTransitPointFormat from '@/models/entities/jorudan/JorudanTransitPointFormat';

export class TransferPoint {
  routeName: string;
  from: string;
  to: string;

  distance: number;
  time: number;

  routeColorRGB: string;

  // get calcHash(): string {
  //   return md5(`${this.name}-${this.company}(${this.grid.lat},${this.grid.lng})`);
  // }

  constructor(jorudanTransitPoint: JorudanTransitPointFormat) {
    this.routeName = jorudanTransitPoint.rosen;
    this.from = jorudanTransitPoint.from;
    this.to = jorudanTransitPoint.to;
    
    this.distance = jorudanTransitPoint.kyori;
    this.time = jorudanTransitPoint.jikan;

    this.routeColorRGB = jorudanTransitPoint.lineColor.rgb[0];
  }
}
