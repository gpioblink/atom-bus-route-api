import JorudanTransitPointFormat from '@/models/entities/jorudan/JorudanTransitPointFormat';

export default class JorudanRouteFormat {
  id: number;
  hyouka: {
    pathCnt: number;
    jikan: number;
    hiyou: number;
    icHiyou: number;
    icExist: number;
    kyori: number;
    norikaeCnt: number;
    status: {
      hayai: number;
      yasui: number;
      raku: number;
      kuuro: number;
      shindai: number;
      kousoku: number;
      isCard: number;
      norikae: number;
      co2: number;
      syubetu: number;
      value: string;
    };
    kubun: {
      shinkansen: number;
      nozomi: number;
      tokkyu: number;
      shindai: number;
      kuuro: number;
      bus: number;
      kousoku: number;
      renraku: number;
      shinya: number;
      ferry: number;
      toho: number;
      yuryou: number;
      jr: number;
      value: string;
    };
  };
  path: [JorudanTransitPointFormat];
}
