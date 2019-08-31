import { APIConst } from '@/models/defines/APIConst';
import * as moment from 'moment';

export default class CommonInput {
  f: number = APIConst.DEFAULT_FORMAT;
  ak: string = APIConst.DEFAULT_API_KEY;
  date: string = moment().format('YYYYMMDD');
  rm: string = '';
  rq: number = APIConst.DEFAULT_REQUEST_NUM;
}

export function convertDateToJoldanFormat(date: Date) {
  return moment(date).format('YYYYMMDD');
}
