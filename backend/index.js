const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyzeRoute = require("./routes/analyze");
const { analyzeTextWithLanguageService } = require("./Services/languageService");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/analyze", analyzeRoute);

app.post("/api/language-test", async (req, res) => {
  const { text } = req.body;

  try {
    const result = await analyzeTextWithLanguageService(text);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Language analysis failed" });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
