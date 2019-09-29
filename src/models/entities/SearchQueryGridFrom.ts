export default interface SearchQueryGridFrom {
  to: string;
  date: Date;
  useDateAs: number;
  fromLat: number;
  fromLng: number;
  /* useDateAs 
    0 : 時刻表なし
    1 : 発時刻(デフォルト)
    2 : 着時刻
    3 : 始発
    4 : 終電 */
}
