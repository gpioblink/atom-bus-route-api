import * as mysql from 'promise-mysql';
// ts側で使われていないような気もする
export class MySQL {
  // tslint:disable-next-line: prettier
  private connection = mysql.createConnection({
    host: 'mysql_host',
    user: '[ユーザーID]',
    password: '[パスワード]',
    database: '[データベース名]',
    multipleStatements: true
  });
}

// ここに書くけど、logicsとmodelってディレクトリになっているけれど、どちらもロジックなので、その辺の考え方がごっちゃになっていそうなので、しっかり整理することをお勧めする
// しかし、意識して分けようというのが見られるところはとてもいいことだと思う
// コメントアウトとconsole.log、使ってなさそうなものが目立つので、それは消したほうが良い
// 