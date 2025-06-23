// src/pages/expense-tracker/AiAnalyzeBudget.tsx
import OpenAI from "openai";
import { useState } from "react";

interface Transaction {
  description: string;
  transactionAmount: number;
  transactionType: string; // "expense" or "income"
}

interface Props {
  transactions: Transaction[];
}

export const AiAnalyzeBudget = ({ transactions }: Props) => {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const token = import.meta.env.VITE_GITHUB_AI_TOKEN; 

    const client = new OpenAI({
      baseURL: "https://models.github.ai/inference",
      apiKey: token,
      dangerouslyAllowBrowser: true, // Add this flag
    });

    const transactionSummary = transactions
      .map((t) => `${t.transactionType.toUpperCase()} - ${t.description}: $${t.transactionAmount}`)
      .join("\n");

    const prompt = `Voici l'historique des transactions d'un utilisateur :\n${transactionSummary}\n\nDonne une analyse du budget et des conseils pour mieux économiser.`;

    try {
      const response = await client.chat.completions.create({
        messages: [
          { role: "system", content: "Tu es un assistant financier intelligent." },
          { role: "user", content: prompt },
        ],
        model: "openai/gpt-4o",
        temperature: 0.7,
        max_tokens: 1000,
      });

      setAiResponse(response.choices[0].message.content || "Pas de réponse.");
    } catch (error) {
      console.error("Erreur GPT :", error);
      setAiResponse("Erreur lors de l'analyse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md mt-6">
      <h2 className="text-lg font-bold mb-2">Analyse IA du budget</h2>
      <button
        onClick={handleAnalyze}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={loading || transactions.length === 0}
      >
        {loading ? "Analyse en cours..." : "Analyser mon budget"}
      </button>
      {transactions.length === 0 && (
        <p className="text-gray-500 text-sm mt-2">
          Ajoutez des transactions pour obtenir une analyse.
        </p>
      )}
      {aiResponse && (
        <div className="mt-4 bg-white p-3 rounded border border-gray-300 whitespace-pre-wrap">
          {aiResponse}
        </div>
      )}
    </div>
  );
};