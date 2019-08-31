export default interface CommonOutput {
  NorikaeBizApiResult: {
    head: {
      functionCode: string;
      errorCode: string;
      rq: string;
    };
    body: [];
  };
}
