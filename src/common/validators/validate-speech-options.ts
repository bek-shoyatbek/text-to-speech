import { Request } from "https://deno.land/x/oak@v17.1.0/mod.ts";

export const validateSpeechOptions = (request: Request) => {
  const text = request.url.searchParams.get("text");
  const voiceId = request.url.searchParams.get("voiceId");
  const speed = request.url.searchParams.get("speed");
  const quality = request.url.searchParams.get("quality");

  if (!text || !voiceId || !speed || !quality) {
    throw new Error("All parameters are required");
  }

  if (Number(speed) < 0.5 || Number(speed) > 5) {
    throw new Error("Speed must be between 0.5 and 5");
  }

  if (quality !== "low" && quality !== "medium" && quality !== "high") {
    throw new Error("Quality must be low, medium or high");
  }

  return { text, voiceId, speed, quality };
};
