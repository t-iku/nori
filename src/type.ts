import { NoriResponse } from "./response.ts";

export type Context = {
  request: Request;
  result: URLPatternResult;
  response: NoriResponse;
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
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "ALL";
