const express = require("express");
const { analyzeTextWithLanguageService } = require("../Services/languageService");
const { deriveSignals } = require("../utils/diagnosticRules");
const { aggregateDiagnostics } = require("../Services/openaiAggregator");

const router = express.Router();

router.post("/", async (req, res) => {
  const { concept, responses } = req.body;

  if (!concept || !responses || responses.length === 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const analyses = [];

    for (const response of responses) {
      const languageResult = await analyzeTextWithLanguageService(response);
      const keyPhrases =
        languageResult.results.documents[0].keyPhrases || [];

      const diagnostic = deriveSignals(concept, keyPhrases);

      analyses.push({
        response,
        keyPhrases,
        ...diagnostic
      });
    }

    const aggregated = await aggregateDiagnostics(concept, analyses);

    res.json({
      ...aggregated,
      evidence: {
        promptsAnalyzed: responses.length,
        signalsObserved: analyses.map(a => a.signals).flat(),
        consistency: `${analyses.filter(a => a.signals.length > 0).length}/${responses.length}`
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Diagnostic analysis failed" });
  }
});

module.exports = router;
