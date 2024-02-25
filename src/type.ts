export type Context = {
  request: Request;
  result: URLPatternResult;
};

export type Handler = (context: Context) => Response | Promise<Response>;

export type Route = {
  path: URLPattern;
  method: string;
  handler: Handler;
};

export type Method =
  | "GET"
  | "POST"
  | "ALL";
