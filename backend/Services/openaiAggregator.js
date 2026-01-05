const axios = require("axios");

async function aggregateDiagnostics(concept, analyses) {
  const prompt = `
You are an expert programming educator performing diagnostic analysis.

Concept: ${concept}

Each item below represents analysis of one student explanation.

Analyses:
${JSON.stringify(analyses, null, 2)}

Your task:
- Detect recurring misconceptions
- Determine severity (Low / Medium / High)
- Provide a concise academic diagnostic insight

Rules:
- Do NOT grade
- Do NOT assign marks
- Focus on conceptual understanding

Respond STRICTLY in JSON:
{
  "misinterpretationDetected": true | false,
  "primaryMisinterpretation": "string",
  "severity": "Low | Medium | High",
  "diagnosticInsight": "string"
}
`;

  const url = `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;

  const response = await axios.post(
    url,
    {
      messages: [
        { role: "system", content: "You are a diagnostic education expert." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_API_KEY
      }
    }
  );

  const outputText = response.data.choices[0].message.content;
  return JSON.parse(outputText);
}

module.exports = { aggregateDiagnostics };
