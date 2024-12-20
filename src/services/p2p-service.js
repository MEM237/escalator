import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    this.chat = null;
  }

  async initializeChat() {
    try {
      this.chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts:
              "You are VEXO AI, a helpful assistant in a video chat application. Keep responses concise and clear.",
          },
          {
            role: "model",
            parts:
              "Initialized as VEXO AI. Ready to assist in video chat context.",
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
      if (!this.chat) {
        await this.initializeChat();
      }

      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini processing error:", error);
      return "Error processing message. Please try again.";
    }
  }
}

export default new GeminiService();
