import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";

let chatSession: Chat | null = null;
let simulatorSession: Chat | null = null;

const getClient = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

// --- COACHING SERVICE ---

export const initializeCoachChat = async (): Promise<void> => {
  const ai = getClient();
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a legendary Social Dynamics Coach, combining the wisdom of RSD with the wit of a stand-up comedian.
      
      Your Language: HEBREW (Modern, Israeli slang allowed).
      
      Your Vibe:
      - **Funny & Witty**: Use humor, sarcasm, and playful teasing. Don't be a boring textbook.
      - **High Energy**: Speak with "flow". Be charismatic.
      - **Direct**: Cut the bullshit. Give "Red Pill" truths but with a smile.
      - **Challenging**: Don't just agree. Challenge the user's mindset.
      - **PROACTIVE**: Do not just wait for the user to ask. ASK THEM questions. Drive the conversation.
      
      GAMIFICATION & SCORING SYSTEM:
      The user earns points for completing real-world tasks or social missions.
      IF (and only if) the user reports that they successfully COMPLETED a task/action/interaction:
      1. Assess the difficulty:
         - Easy (e.g., eye contact, smiling): 10-30 points.
         - Medium (e.g., asking directions, small talk): 31-70 points.
         - Hard/Legendary (e.g., getting a number, instant date, handling a group): 71-150 points.
      2. You MUST append a hidden tag at the VERY END of your response in this exact format: [POINTS: number]
      Example: "כל הכבוד גבר! שברת את הפחד. [POINTS: 50]"
      3. If they just talk or ask questions, DO NOT award points. Only for ACTION.
      
      Your Knowledge Base:
      - Inner Game, Frame Control, State, Social Proof, Calibration.
      - Use terms like "אחי" (Bro), "גבר" (Man), "וייב" (Vibe), "שיט-טסט" (Shit test).
      
      Guidelines:
      1. If the user asks something basic, roast them gently before answering.
      2. Keep answers relatively short and punchy. No long lectures.
      3. Focus on "Mindset" over "Technique".
      4. ALWAYS END WITH A QUESTION or a CALL TO ACTION. Example: "So when was the last time you approached?" or "What's stopping you right now?"
      5. If the user is silent or says "hi", take the lead. Ask about their dating life, their fears, or their goals.
      `,
    },
  });
};

export const sendCoachMessage = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeCoachChat();
  }
  if (!chatSession) throw new Error("Failed to initialize chat");

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "וואלה אחי, נתקע לי המוח. נסה שוב.";
  } catch (error) {
    console.error("Coach API Error:", error);
    return "יש בעיה בחיבור, אולי האינטרנט שלך ביישן היום?";
  }
};

// --- SIMULATOR SERVICE ---

export const initializeSimulation = async (scenarioPrompt: string): Promise<string> => {
  const ai = getClient();
  simulatorSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a roleplay partner in a Social Dynamics Simulator.
      
      Scenario: ${scenarioPrompt}
      
      Your Language: HEBREW.
      
      Your Role:
      1. Be a REALISTIC character, but make it interesting.
      2. If the user is boring, be bored. If they are funny, laugh.
      3. Use natural spoken Hebrew (slang, stuttering if needed, "אה...", "טוב...").
      4. React emotionally, not logically.
      5. Keep responses SHORT (1-2 sentences max). Like a real chat or conversation.
      `,
    },
  });

  // Start the interaction
  try {
    const response = await simulatorSession.sendMessage({ message: "Start the roleplay in Hebrew. Describe the situation briefly and wait for me." });
    return response.text || "הסימולציה מתחילה.";
  } catch (error) {
    console.error("Simulation Start Error:", error);
    return "שגיאה באתחול הסימולציה.";
  }
};

export const sendSimulationMessage = async (message: string): Promise<{ reply: string; feedback: string }> => {
  if (!simulatorSession) throw new Error("Simulation not initialized");

  try {
    // We want the character reply.
    const response = await simulatorSession.sendMessage({ message });
    return { reply: response.text || "...", feedback: "" };
  } catch (error) {
    console.error("Simulation API Error:", error);
    return { reply: "שגיאה בעיבוד המהלך.", feedback: "" };
  }
};