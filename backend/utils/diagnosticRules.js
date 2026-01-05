const expectedConcepts = {
  recursion: ["base case", "call stack", "termination"]
};

function deriveSignals(concept, keyPhrases) {
  const expected = expectedConcepts[concept.toLowerCase()] || [];
  const lowerPhrases = keyPhrases.map(p => p.toLowerCase());

  const missing = expected.filter(
    exp => !lowerPhrases.some(p => p.includes(exp))
  );

  const signals = [];

  if (missing.length >= 2) {
    signals.push("concept_oversimplified");
  }

  if (missing.includes("base case")) {
    signals.push("missing_base_case_reasoning");
  }

  if (missing.includes("call stack")) {
    signals.push("missing_stack_model");
  }

  return { signals, missing };
}

module.exports = { deriveSignals };
