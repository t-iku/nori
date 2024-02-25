# Nori

A powerless web framework for Deno.

## Usage

```TypeScript
import { Nori } from "https://raw.githubusercontent.com/t-iku/nori/master/src/nori.ts";

const app = new Nori();

app.get("/", () => {
  return new Response("Nori kutte NoriNori");
});

app.serve(8080);
```
