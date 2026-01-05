const axios = require("axios");

const endpoint = process.env.AZURE_LANGUAGE_ENDPOINT;
const apiKey = process.env.AZURE_LANGUAGE_KEY;

async function analyzeTextWithLanguageService(text) {
  const url = `${endpoint}language/:analyze-text?api-version=2023-11-15-preview`;

  const body = {
    kind: "KeyPhraseExtraction",
    analysisInput: {
      documents: [
        {
          id: "1",
          language: "en",
          text
        }
      ]
    }
  };

  const headers = {
    "Ocp-Apim-Subscription-Key": apiKey,
    "Content-Type": "application/json"
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Azure Language error:",
      error.response?.data || error.message
    );
    throw error;
  }
}

module.exports = { analyzeTextWithLanguageService };
