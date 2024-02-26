import { Nori } from "https://deno.land/x/nori@v0.0.1/src/nori.ts";

const app = new Nori();

app.get("/", () => {
  return new Response("Nori kutte NoriNori", {
    status: 200,
  });
});

app.get("/id/:id", ({ result }) => {
  const { id } = result.pathname.groups;
  return new Response(id, {
    status: 200,
  });
});

app.get("/json", ({ request }) => {
  const data = {
    "key": "value",
    "url": request.url,
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});

app.get("/redirect", ({ request }) => {
  const root = new URL(request.url).origin;
  return Response.redirect(root);
});

app.serve(8080);
