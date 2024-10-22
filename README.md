# VoiceVibe - Text to Speech Converter (Backend)

A modern, high-performance backend service for the VoiceVibe text-to-speech converter built with Deno and Oak.

## 🦕 Technologies Used

- [Deno](https://deno.land/) - A secure runtime for JavaScript and TypeScript
- [Oak](https://oakserver.github.io/oak/) - Middleware framework for Deno
- TypeScript
- Text-to-Speech API Integration

## 🚀 Features

- 🎵 Multiple voice options with PlayHT API integration
- 🔄 Real-time audio conversion
- 🎛️ Customizable speech parameters
- 🔒 Built-in security with Deno permissions
- 📝 TypeScript support out of the box
- ⚡ High-performance middleware
- 🔍 Request validation

## 📦 Prerequisites

1. Install Deno:
```bash
# On macOS or Linux
curl -fsSL https://deno.land/x/install/install.sh | sh

# On Windows using PowerShell
irm https://deno.land/install.ps1 | iex
```

2. Verify installation:
```bash
deno --version
```

## 🛠️ Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/voicevibe-backend.git
cd voicevibe-backend
```

2. Create a `.env` file:
```env
PORT=8000
PLAYHT_API_KEY=your_api_key
PLAYHT_USER_ID=your_user_id
ALLOW_ORIGIN=your_allowed_origin
```

3. Start the server:
```bash
deno task dev
```

Or run directly:
```bash
deno run --allow-net --allow-env --allow-read main.ts
```

## 📝 Scripts in deno.json

```json
{
  "tasks": {
    "start": "deno run -A server.ts",
    "build": "deno compile server.ts",
    "dev": "deno run --watch -A server.ts"
  }
}
```

## 🔧 API Endpoints

### Get Available Voices
```http
GET /voices
```

Response:
```json
[
  {
    "voiceEngine": "PlayHT2.0",
    "id": "s3://voice-cloning-zero-shot/...",
    "name": "Charlotte (Narrative)",
    "language": "English (CA)",
    "languageCode": "en-CA",
    "gender": "female",
    "ageGroup": "adult",
    "styles": ["narrative"],
    "isCloned": false
  }
]
```

### Convert Text to Speech
```http
POST /text-to-speech
```

Request query parameters:
```json
{
  "text": "Text to convert to speech",
  "voiceId": "selected_voice_id",
  "speed": 1.0,
  "quality": "medium"
}
```

Response: Audio file stream


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Run tests
4. Submit a pull request


## 👥 Author

- Bek Shoyatbek - [GitHub](https://github.com/bek-shoyatbek)

## 📚 Resources

- [Deno Manual](https://deno.land/manual)
- [Oak Documentation](https://oakserver.github.io/oak/)
- [Deno Deploy Documentation](https://deno.com/deploy/docs)