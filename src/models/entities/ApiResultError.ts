type ApiErrorType =
  | '該当のルートが見つかりませんでした'
  | 'ルート上付近のバス停が見つかりませんでした'
  | '場所を特定できませんでした';
export default interface ApiResultError {
  error: ApiErrorType;
}
