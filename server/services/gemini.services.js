// const MODEL = "gemini-2.5-flash"; 
// const Gemini_Url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// export const generateGeminiResponse = async (prompt) => {
//   try {
//     const response = await fetch(Gemini_Url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-goog-api-key": process.env.GEMINI_API_KEY,
//       },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }],
//         generationConfig: { responseMimeType: "application/json" },
//       }),
//     });

//     if (!response.ok) {
//       const err = await response.text();
//       throw new Error(`Gemini ${response.status}: ${err}`);
//     }

//     const data = await response.json();
//     const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!text) {
//       throw new Error("No text returned from Gemini");
//     }

//     const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
//     return JSON.parse(cleanText);
//   } catch (error) {
//     console.error("Gemini error:", error.message); 
//     throw error;                                   
//   }
// };


// Tried in order. If the first is overloaded, the next one is used.
// Check Google AI Studio for current model names, they change over time.
const MODELS = [
  "gemini-3.5-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
];

const RETRYABLE = [429, 500, 503, 504];
const ATTEMPTS_PER_MODEL = 3;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const callGemini = async (model, prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    const err = new Error(`Gemini ${response.status} (${model}): ${body}`);
    err.status = response.status;
    throw err;
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No text returned from Gemini");

  const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(clean);
};

export const generateGeminiResponse = async (prompt) => {
  let lastError;

  for (const model of MODELS) {
    for (let attempt = 1; attempt <= ATTEMPTS_PER_MODEL; attempt++) {
      try {
        return await callGemini(model, prompt);
      } catch (error) {
        lastError = error;
        console.error(`Gemini error [${model}, attempt ${attempt}]:`, error.message);

        // Only retry temporary failures, fail fast on 400, 403, 404 etc.
        if (!RETRYABLE.includes(error.status)) throw error;

        if (attempt < ATTEMPTS_PER_MODEL) await sleep(1500 * attempt);
      }
    }
  }

  throw lastError; 
};