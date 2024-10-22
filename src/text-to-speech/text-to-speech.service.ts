import * as PlayHT from "npm:playht";
import env from "../common/configs/index.ts";

export class TextToSpeechService {
    constructor() {
        const userId = env.PLAYHT_USER_ID;
        const apiKey = env.PLAYHT_API_KEY;
        
        if (!userId || !apiKey) {
            throw new Error("PLAYHT_USER_ID and PLAYHT_API_KEY must be set");
        }

        PlayHT.init({
            userId,
            apiKey,
        });
    }

    async convertTextToSpeech(text: string) {
        try {
            const stream = await PlayHT.stream(text, {
                voiceEngine: "Play3.0-mini",
                speed: 0.9,
                quality: "medium", // Added for better performance
            });
            return stream;
        } catch (error) {
            console.error("Text to speech conversion failed:", error);
            throw new Error("Failed to convert text to speech");
        }
    }
}