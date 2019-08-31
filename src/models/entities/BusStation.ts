import * as md5 from 'md5';
import Grid from '@/models/entities/Grid';

export class BusStation {
  private _name: string;
  private _company: string;
  private _grid: Grid;
  private _nextBus: Set<BusStation>;

  get name(): string {
    return this.name;
  }
  get company(): string {
    return this.company;
  }
  get grid(): Grid {
    return this.grid;
  }

  calcHash(): string {
    return md5(`${this.name}-${this.company}(${this.grid.lat},${this.grid.lng})`);
  }

  addNextBusStop(nextBusStop: BusStation) {
    this._nextBus.add(nextBusStop);
  }

  constructor(name: string, company: string, grid: Grid) {
    this._name = name;
    this._company = company;
    this._grid = grid;
    this._nextBus = new Set<BusStation>();
  }
}
