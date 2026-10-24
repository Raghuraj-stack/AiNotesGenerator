export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart,
}) => {
  return `
You are a STRICT JSON generator for an exam preparation system.

\u26A0\uFE0F VERY IMPORTANT:
- Output MUST be valid JSON
- Your response will be parsed using JSON.parse()
- INVALID JSON will cause system failure
- Use ONLY double quotes "
- NO comments, NO trailing commas
- Escape line breaks using \\n
- Do NOT use emojis inside text values
- Do NOT wrap the output in markdown or code fences
- Do NOT add any text before or after the JSON

TASK:
Convert the given topic into exam-focused notes.

INPUT:
Topic: ${topic}
Class Level: ${classLevel || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revisionMode ? "ON" : "OFF"}
Include Diagram: ${includeDiagram ? "YES" : "NO"}
Include Charts: ${includeChart ? "YES" : "NO"}

RULES:
- Content must match the class level and exam type
- Focus on high-yield, frequently asked exam points
- Use simple, clear language
- Keep every text value free of markdown symbols
${
  revisionMode
    ? `- Revision Mode is ON: keep notes SHORT, use crisp points, formulas, keywords and quick facts only
- Prefer revisionPoints over long explanations`
    : `- Revision Mode is OFF: give complete, well-explained notes with examples where useful`
}

OUTPUT FORMAT (return EXACTLY this JSON structure):

{
  "subTopics": [
    {
      "title": "string",
      "importance": "high | medium | low",
      "notes": "string"
    }
  ],
  "revisionPoints": [
    "string"
  ],
  "questions": {
    "short": [
      "string"
    ],
    "long": [
      "string"
    ],
    "diagram": "string"
  },
  "diagram": ${
    includeDiagram
      ? `{
    "type": "flowchart | mindmap | process",
    "title": "string",
    "data": "valid Mermaid syntax as a single string, using \\\\n for line breaks"
  }`
      : "null"
  },
  "charts": ${
    includeChart
      ? `[
    {
      "type": "bar | line | pie",
      "title": "string",
      "labels": ["string"],
      "values": [0]
    }
  ]`
      : "[]"
  }
}

CONTENT GUIDELINES:
- subTopics: 4 to 8 items, ordered from most to least important
- revisionPoints: 8 to 15 short, memorable points
- questions.short: 5 to 8 likely short-answer questions
- questions.long: 3 to 5 likely long-answer questions
- questions.diagram: one diagram-based question, or an empty string if not relevant
${
  includeDiagram
    ? "- diagram: must be relevant to the topic and renderable as Mermaid"
    : "- diagram: MUST be null"
}
${
  includeChart
    ? "- charts: 1 to 3 charts with real, meaningful data; labels and values must have equal length"
    : "- charts: MUST be an empty array"
}

FINAL CHECK before answering:
- The JSON parses with JSON.parse() without errors
- No trailing commas, no comments, no emojis
- Every string is in double quotes with line breaks escaped as \\n
`;
};