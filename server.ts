import { Application, Router } from "./dependencies.ts";
import router from "./router.ts";

const port = 5000;
const app = new Application();

// app.use(router.allowedMethods());
app.use(router.routes());

console.log(`Server listening on port ${port}`);
await app.listen({ port });
