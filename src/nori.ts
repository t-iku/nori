import { NoriResponse } from "./response.ts";
import { Handler, Method, Route } from "./type.ts";

export class Nori {
  private routes: Route[] = [];

  get(path: string, handler: Handler) {
    this.setRoute("GET", path, handler);
  }

  post(path: string, handler: Handler) {
    this.setRoute("POST", path, handler);
  }

  put(path: string, handler: Handler) {
    this.setRoute("PUT", path, handler);
  }

  patch(path: string, handler: Handler) {
    this.setRoute("PATCH", path, handler);
  }

  delete(path: string, handler: Handler) {
    this.setRoute("DELETE", path, handler);
  }

  all(path: string, handler: Handler) {
    this.setRoute("ALL", path, handler);
  }

  private setRoute(method: Method, path: string, handler: Handler) {
    this.routes.push({
      path: new URLPattern({
        pathname: path,
      }),
      method: method,
      handler: handler,
    });
  }

  serve(port = 3000, errorResponse = new Response(null, { status: 404 })) {
    const handler = (request: Request): Response | Promise<Response> => {
      for (const route of this.routes) {
        const result = route.path.exec(request.url);
        if (
          result && (route.method === request.method || route.method === "ALL")
        ) {
          return route.handler(
            { request, result, response: new NoriResponse() },
          );
        }
      }
      return errorResponse;
    };
    Deno.serve({ port }, handler);
  }
}
