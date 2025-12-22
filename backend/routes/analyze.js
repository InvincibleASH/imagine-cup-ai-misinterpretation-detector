const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { concept, explanation } = req.body;

  if (!concept || !explanation) {
    return res.status(400).json({ error: "Missing input" });
  }

  // Dummy response (AI will replace this later)
  res.json({
    misinterpretationDetected: true,
    misinterpretationType: "Concept Confusion",
    severity: "Medium",
    diagnosticInsight:
      "The explanation treats inheritance as simple code copying rather than an is-a relationship."
  });
});

module.exports = router;
