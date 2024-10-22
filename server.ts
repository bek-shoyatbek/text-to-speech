import env from "./src/common/configs/index.ts";
import {  ROOT_DIR, ROOT_DIR_PATH } from "./src/common/constants/index.ts";
import { Application } from "./deps.ts";
import { send } from "./deps.ts";
import { textToSpeechRouter } from "./src/text-to-speech/index.ts";

const app = new Application();



app.use(textToSpeechRouter.routes());

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


await app.listen({ port: Number(env.APP_PORT) });

console.log(`Server is running on port ${env.APP_PORT}`);
