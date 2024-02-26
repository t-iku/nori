# Nori

A powerless web framework for Deno.

## Usage

```TypeScript
import { Nori } from "https://deno.land/x/nori@v0.0.1/src/nori.ts";

const app = new Nori();

app.get("/", () => {
  return new Response("Nori kutte NoriNori");
});

app.serve(8080);
```
