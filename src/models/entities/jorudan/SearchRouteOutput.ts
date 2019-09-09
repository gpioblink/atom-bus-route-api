import CommonOutput from '@/models/entities/jorudan/CommonOutput';

export default class SearchRouteOutput {
  num: number;
  storeData: string;
  route: [
    {
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
        path: [
          {
            rosen: number;
            rosenSyubetu: number;
            from: string;
            fromExt: string;
            to: string;
            toExt: string;
            kyori: number;
            jikan: number;
            mati: number;
            idou: number;
            norikae: number;
            direction: number;
            seatName: string;
            seatCode: number;
            seatKubun: {
              num: number;
            };
            untin: number;
            untinOufuku: number;
            untinTuusan: number;
            untinGakusei: number;
            tokkyu: number;
            tokkyuGreen: number;
            tokkyuShindai: number;
            tokkyuKisetu: number;
            tokkyuWaribiki: number;
            tokkyuTuusan: number;
            icExist: number;
            icUntin: number;
            icUntinTuusan: number;
            icUntinGakusei: number;
            icTokkyu: number;
            icTokkyuGreen: number;
            icTokkyuTuusan: number;
            airLine: number;
            fromDate: number;
            fromTime: string;
            fromTimeType: number;
            toDate: number;
            toTime: string;
            toTimeType: number;
            lineName: string;
            lineIndex: number;
            selectLine: string;
            lineType: string;
            lineColor: {
              type: number;
              num: number;
              rgb: string[];
            };
            haveDiagram: number;
            useDiagram: number;
            rosenCorp: string;
            busCorp: string;
            josyaText: string;
            fromPlatform: string;
            toPlatform: string;
            tokurei: string;
            icTokurei: string;
            co2: number;
            fromX: string;
            fromY: string;
            toX: string;
            toY: string;
          }
        ];
      };
    }
  ];
}
