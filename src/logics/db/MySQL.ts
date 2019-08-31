import * as mysql from 'promise-mysql';

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
