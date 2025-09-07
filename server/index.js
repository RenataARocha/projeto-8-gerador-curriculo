import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/melhorar-texto", async (req, res) => {
  try {
    const { texto } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é um assistente que melhora textos." },
        { role: "user", content: `Melhore o seguinte texto: ${texto}` },
      ],
    });

    res.json({ resultado: response.choices?.[0]?.message?.content ?? "" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message || "Erro no servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
