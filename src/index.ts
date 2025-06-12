import { Elysia } from "elysia";
import { file_uploader } from "./modules/file-uploader";

const app = new Elysia()
.onRequest(({ request, set }) => {
    const apiKeyHeader = request.headers.get('x-api-key');
    const validKey = process.env.API_KEY;

    if (apiKeyHeader !== validKey) {
      set.status = 500;
      return 'Internal Server Error';
    }
  })
.use(file_uploader)
.get("/", () => "Hello to the file uploader on luminesway")
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
