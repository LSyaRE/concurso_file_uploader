import { Elysia } from "elysia";
import { file_uploader } from "./modules/routes/file-uploader";
import { logger } from "./config/logger";




const app = new Elysia()
.onRequest(({ request, set }) => {
    const apiKeyHeader = request.headers.get('x-api-key');
    const validKey = process.env.API_KEY;
    logger.info('Verficando autenticación con API Key');

    logger.info(request);
    if (apiKeyHeader !== validKey) {
      logger.info('API Key inválida');
      set.status = 500;
      return 'Internal Server Error';
    }
    logger.info('Paso la verificación de API Key');
  })
.use(file_uploader)
.get("/", () => "Hello to the file uploader on luminesway")
.listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
