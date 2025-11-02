import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const bannedKeywords = ["kill", "hack", "bomb"];
const systemPrompt = "You are a concise, friendly assistant who always provides helpful and safe answers.";

const apiKey = process.env.DEEPSEEK_API_KEY;
if (!apiKey) {
  console.error("Missing DEEPSEEK_API_KEY environment variable. Set it before running the script.");
  process.exit(1);
}

const rl = readline.createInterface({ input, output });

async function main() {
  try {
    const userPrompt = await rl.question("Enter your prompt: ");

    if (containsBannedKeyword(userPrompt)) {
      console.log("Your input/output violated the moderation policy.");
      return;
    }

  const aiResponse = await callDeepSeek(systemPrompt, userPrompt);
    const moderated = moderateOutput(aiResponse);

    if (!moderated.isSafe) {
      console.log("Your input/output violated the moderation policy.");
      return;
    }

    console.log("\nAI response:\n");
    console.log(moderated.text);
  } catch (error) {
    console.error("Something went wrong while talking to the AI:", error);
  } finally {
    rl.close();
  }
}

function containsBannedKeyword(text) {
  return bannedKeywords.some((word) => text.toLowerCase().includes(word));
}

function moderateOutput(text) {
  let isSafe = true;
  let moderatedText = text;

  for (const keyword of bannedKeywords) {
    const pattern = new RegExp(keyword, "gi");
    if (pattern.test(moderatedText)) {
      isSafe = false;
      moderatedText = moderatedText.replace(pattern, "[REDACTED]");
    }
  }

  return { isSafe, text: moderatedText };
}

async function callDeepSeek(systemPrompt, userPrompt) {
  const response = await fetch("https://openrouter.ai/settings/keys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
  throw new Error(`DeepSeek API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const aiMessage = data.choices?.[0]?.message?.content;

  if (!aiMessage) {
    throw new Error("AI response did not include any content.");
  }

  return aiMessage.trim();
}

await main();
