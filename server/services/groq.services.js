// Groq uses an OpenAI-compatible API.
// .env needs: GROQ_API_KEY=gsk_...   (optional: GROQ_MODEL=...)
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-20b";

const RETRYABLE = [500, 502, 503, 504];
const ATTEMPTS = 2;
const REQUEST_TIMEOUT_MS = 60000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateGroqResponse = async (prompt) => {
  // read env at call time, so it works even if dotenv loads after imports
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || DEFAULT_MODEL;

  if (!apiKey) throw new Error("GROQ_API_KEY is missing in .env");

  let lastError;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const response = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: "You output only a single valid JSON object. No markdown, no extra text.",
            },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.4,
          max_tokens: 5000, // raise if long notes get cut off and JSON.parse fails
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (!response.ok) {
        const body = await response.text();
        const err = new Error(`Groq ${response.status} (${model}): ${body}`);
        err.status = response.status;
        throw err;
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      if (!text) throw new Error("No text returned from Groq");

      const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const result = JSON.parse(clean);
      console.log(`Groq OK with ${model} (attempt ${attempt})`);
      return result;
    } catch (error) {
      lastError = error;
      console.error(`Groq error [attempt ${attempt}]:`, error.message);

      const temporary =
        RETRYABLE.includes(error.status) || error.name === "TimeoutError";
      if (!temporary) throw error; // 400, 401, 429 (rate limit) etc. -> give up here
      if (attempt < ATTEMPTS) await sleep(1500 * attempt);
    }
  }

  throw lastError;
};