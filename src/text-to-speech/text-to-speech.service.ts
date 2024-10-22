import type { VoiceAgeGroup } from "playht";
import * as PlayHT from "npm:playht";

export class TextToSpeechService {
  constructor() {
    const userId = Deno.env.get("PLAYHT_USER_ID");
    const apiKey = Deno.env.get("PLAYHT_API_KEY");

    if (!userId || !apiKey) {
      throw new Error("PLAYHT_USER_ID and PLAYHT_API_KEY must be set");
    }

    PlayHT.init({
      userId,
      apiKey,
    });
  }

  async convertTextToSpeechStream(
    text: string,
    voiceId: string,
    speed: number,
    quality: "low" | "medium" | "high",
  ) {
    try {
      const stream = await PlayHT.stream(text, {
        voiceId,
        voiceEngine: "Play3.0-mini",
        speed,
        quality,
      });
      
      return stream;
    } catch (error) {
      console.error("Text to speech conversion failed:", error);
      throw new Error("Failed to convert text to speech");
    }
  }

  async getListOfVoices(
    gender: "male" | "female" = "female",
    ageGroup: VoiceAgeGroup[] = ["adult"],
  ) {
    const voices = await PlayHT.listVoices({
      gender,
      ageGroup,
    });

    return voices;
  }

  async convertTextToSpeechFull(text: string) {
    const response = await PlayHT.generate(text, {
      outputFormat: "mp3",
      voiceEngine: "PlayHT2.0",
    });
    return response;
  }
}
