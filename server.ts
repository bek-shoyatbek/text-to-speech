import { ROOT_DIR, ROOT_DIR_PATH } from "./src/common/constants/index.ts";
import { Application, oakCors, send } from "./deps.ts";
import { textToSpeechRouter } from "./src/text-to-speech/index.ts";

const app = new Application();

app.use(oakCors());
app.use(textToSpeechRouter.routes());
app.use(textToSpeechRouter.allowedMethods());

app.use(async (ctx, next) => {
  if (!ctx.request.url.pathname.startsWith(ROOT_DIR_PATH)) {
    next();
    return;
  }
  const filePath = ctx.request.url.pathname.replace(ROOT_DIR_PATH, "");
  await send(ctx, filePath, {
    root: ROOT_DIR,
  });
});

const appPort = Deno.env.get("APP_PORT");

if (!appPort) {
  throw new Error("APP_PORT is not set");
}
await app.listen({ port: Number(appPort) });

console.log(`Server is running on port ${appPort}`);
