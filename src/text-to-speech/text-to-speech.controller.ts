// text-to-speech.controller.ts
import { Buffer } from "node:buffer";
import { Router } from "../../deps.ts";
import { TextToSpeechService } from "./text-to-speech.service.ts";

export const textToSpeechRouter = new Router();
const textToSpeechService = new TextToSpeechService();

textToSpeechRouter.get("/text-to-speech", async (ctx) => {
  try {
    const { request } = ctx;
    const text = request.url.searchParams.get("text");

    if (!text) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Text parameter is required" };
      return;
    }

    const audioData = await textToSpeechService.convertTextToSpeech(text);

    // Set proper headers for audio streaming
    ctx.response.headers.set("Content-Type", "audio/mpeg");
    ctx.response.headers.set("Accept-Ranges", "bytes");
    ctx.response.headers.set("Cache-Control", "no-cache");

    // Collect and process chunks
    const chunks: Uint8Array[] = [];
    let totalLength = 0;

    for await (const chunk of audioData) {
      // Convert Buffer or string to Uint8Array if necessary
      let uint8Chunk: Uint8Array;

      if (chunk instanceof Uint8Array) {
        uint8Chunk = chunk;
      } else if (typeof chunk === "string") {
        uint8Chunk = new TextEncoder().encode(chunk);
      } else if (Buffer.isBuffer(chunk)) {
        uint8Chunk = new Uint8Array(chunk);
      } else {
        throw new Error("Unsupported chunk type");
      }

      chunks.push(uint8Chunk);
      totalLength += uint8Chunk.length;
    }

    // Combine all chunks into a single Uint8Array
    const fullAudio = new Uint8Array(totalLength);
    let offset = 0;

    for (const chunk of chunks) {
      fullAudio.set(chunk, offset);
      offset += chunk.length;
    }

    ctx.response.headers.set("Content-Length", String(totalLength));
    ctx.response.body = fullAudio;
  } catch (error) {
    console.error("Error in text-to-speech endpoint:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});
