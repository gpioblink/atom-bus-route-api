export namespace APIConst {
  export const ENDPOINT_URL = 'https://cloud.jorudan.biz/api/';
  export const DEFAULT_API_KEY: string = process.env.JOLDAN_API_KEY; // OSの環境変数にキー「JOLDAN_API_KEY」を追加してください
  export const DEFAULT_FORMAT = 0;
  export const DEFAULT_REQUEST_NUM = 114514; // 正直この値はなんでもいい
}