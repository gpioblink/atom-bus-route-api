import CommonInput from '@/models/entities/jorudan/CommonInput';

export default class SearchRouteInput extends CommonInput {
  eki1: string;
  eki2: string;
  eki3: string;
  eki4: string;
  eki5: string;
  eki6: string;

  cpn1: string;
  cpn2: string;
  cpn3: string;
  cpn4: string;
  cpn5: string;
  cpn6: string;

  time: string; // TODO: ちゃんとformatに

  opt1: number;
  opt2: number;
  opt3: number;
  opt4: number;

  max: number;
  sort: number;
  trtm: number;
}
