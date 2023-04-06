export type Action = {
  type: string;
  payload?: Payload;
  error?: any;
};

export type Payload = {
  params?: any;
  callback?: (data?: any) => any;
  response?: any;
};
