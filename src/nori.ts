import { Handler, Method, Route } from "./type.ts";

export class Nori {
  private routes: Route[] = [];

  get(path: string, handler: Handler) {
    this.setRoute("GET", path, handler);
  }

  post(path: string, handler: Handler) {
    this.setRoute("POST", path, handler);
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
            { request, result },
          );
        }
      }
      return errorResponse;
    };
    Deno.serve({ port }, handler);
  }
}
