import { rtdb } from "../services/firebase";
import { ref, push } from "firebase/database";

// AI message handling in background script
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "AI_PROCESS") {
    try {
      // Initialize Gemini API
      const model = await chrome.ml.getModel("gemini-nano");

      // Process the message
      const result = await model.generateContent({
        text: request.data.message,
        context: request.data.context,
      });

      // Store in Firebase for sync
      const analysisRef = ref(rtdb, `analysis/${request.data.timestamp}`);
      await push(analysisRef, {
        input: request.data.message,
        output: result,
        timestamp: Date.now(),
      });

      sendResponse({ success: true, result });
    } catch (error) {
      console.error("AI processing error:", error);
      sendResponse({ success: false, error: error.message });
    }
    return true;
  }

  if (request.type === "AI_ANALYZE_FRAME") {
    try {
      const model = await chrome.ml.getModel("gemini-nano");
      const analysis = await model.analyzeImage({
        image: request.data.frame,
        context: request.data.context,
      });

      sendResponse({ success: true, analysis });
    } catch (error) {
      console.error("Frame analysis error:", error);
      sendResponse({ success: false, error: error.message });
    }
    return true;
  }
});
