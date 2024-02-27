export class NoriResponse {
  private _status: number;
  private _headers = {};

  constructor(status = 200) {
    this._status = status;
  }

  public get status(): number {
    return this.status;
  }

  public set staus(v: number) {
    this._status = v;
  }

  public set headers(data: HeadersInit) {
    this._headers = {
      ...this._headers,
      ...data,
    };
  }

  public respond(data: BodyInit | null | undefined) {
    return new Response(data, {
      status: this._status,
      headers: this._headers,
    });
  }

  public text(data: string) {
    this._headers = { "Content-Type": "text/plain" };
    return this.respond(data);
  }

  public json(data: object) {
    this._headers = { "Content-Type": "application/json" };
    return this.respond(JSON.stringify(data));
  }

  public html(data: string) {
    this._headers = { "Content-Type": "text/html" };
    return this.respond(data);
  }

  public redirect(url: string | URL, status = 302) {
    return Response.redirect(url, status);
  }

  public error(status = 400) {
    return new Response(null, { status });
  }
}
