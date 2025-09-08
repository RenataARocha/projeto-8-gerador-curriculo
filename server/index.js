import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/melhorar-texto", async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto || texto.trim().length === 0) {
      return res.json({ resultado: texto });
    }

    // Prompt mais agressivo para reescrever texto
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente que reescreve textos para deixá-los claros, envolventes, persuasivos e profissionais."
        },
        {
          role: "user",
          content: `Reescreva este texto de forma mais clara, envolvente e persuasiva. 
Use frases mais curtas, melhore a pontuação e estilo, substitua palavras repetidas e organize o conteúdo para que fique mais impactante, mantendo o sentido original:\n\n${texto}`
        }
      ],
      temperature: 0.9,
      max_tokens: 800
    });

    const resultado = completion.choices?.[0]?.message?.content?.trim() || texto;

    res.json({ resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message || "Erro no servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
