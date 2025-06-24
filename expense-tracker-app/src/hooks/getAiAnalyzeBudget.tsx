interface Transaction {
  id: string;
  description: string;
  transactionAmount: number;
  transactionType: string;
  createdAt: any; // Firebase Timestamp
}
function formatTransactionsForAI(transactions: Transaction[]): string {
  return transactions.map((t) => {
    const date = t.createdAt.toDate?.().toLocaleDateString?.() || "unknown date";
    return `- ${t.description} (${t.transactionType}): ${t.transactionAmount} on ${date}`;
  }).join("\n");
}

export async function getAiAnalyzeBudget(
  transactions: Transaction[],
  messages: { role: "user" | "assistant" | "system"; content: string }[]
): Promise<string | null> {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const endpoint = "https://models.github.ai/inference/chat/completions";
  const model = "openai/gpt-4.1";

  if (!token) return null;

  const historyString = formatTransactionsForAI(transactions);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are a helpful finance assistant." },
          {
            role: "user",
            content: `Here is my transaction history:\n${historyString}`,
          },
          ...messages,
        ],
        temperature: 1,
        top_p: 1,
      }),
    });

    const data = await response.json();

    if (!response.ok) return null;

    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI error", error);
    return null;
  }
}
