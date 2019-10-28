// ApiErrorTypeの定義をしているのいいね！
// 使っている側見るとこの文字列を扱っているので、enumか何かで定義して、その中身をこの文字列にしたほうがいいかも
// それでそのenumを使う側は使用したほうが文字列を直接扱うより安全性も高いし変更を容易い
type ApiErrorType =
  | '該当のルートが見つかりませんでした'
  | 'ルート上付近のバス停が見つかりませんでした'
  | '場所を特定できませんでした';
export default interface ApiResultError {
  error: ApiErrorType;
}
