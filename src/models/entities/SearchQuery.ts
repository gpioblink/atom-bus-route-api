export default interface SearchQuery {
  from: string;
  to: string;
  date: Date;
  useDateAs: number;// enum定義で良い気がする
  // 以下のコメントいいね！
  
  /* useDateAs 
  0 : 時刻表なし
  1 : 発時刻(デフォルト)
  2 : 着時刻
  3 : 始発
  4 : 終電 */
}
