import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

class GeminiService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    this.chat = null;
  }

  async initializeChat() {
    try {
      this.chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: "You are VEXO AI, a helpful assistant in a video chat application.",
              },
            ],
          },
        ],
      });
      return true;
    } catch (error) {
      console.error("Gemini chat initialization error:", error);
      return false;
    }
  }

  async processMessage(message) {
    try {
      const result = await this.chat.sendMessage(message);
      return result.response.text();
    } catch (error) {
      console.error("Message processing error:", error);
      throw error;
    }
  }
}

export default new GeminiService();
