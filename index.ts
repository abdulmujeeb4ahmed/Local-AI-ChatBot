import dotenv from "dotenv";
dotenv.config();

import * as readline from "node:readline/promises";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { CoreMessage, streamText } from "ai";

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  // Verifies that .env was loaded
  const key = process.env.OPENAI_API_KEY;
  const base = process.env.OPENAI_API_BASE;
  if (!key) {
    console.error("❌ MISSING: OPENAI_API_KEY in .env (should be your sk-or-v1-… key)");
    process.exit(1);
  }
  if (!base) {
    console.error("❌ MISSING: OPENAI_API_BASE in .env (should be https://openrouter.ai/api/v1)");
    process.exit(1);
  }

  // Builds an OpenRouter “provider” object
  const openrouter = createOpenRouter({ apiKey: key });

  console.log("✅ OpenRouter provider ready.");
  console.log("   (Type anything and press Enter. Ctrl+C to quit.)\n");

  // Keeps full conversation history so you maintain context
  const history: CoreMessage[] = [];

  while (true) {
    // User prompt
    const userInput = await terminal.question("You: ");
    history.push({ role: "user", content: userInput });

    const modelId = "deepseek/deepseek-r1:free";

    const result = streamText({
      model: openrouter.chat(modelId),
      messages: history,
    });

    // Prints “Assistant
    let assistantReply: string = ""; // must use `let`, so we can append
    process.stdout.write("\nAssistant: ");

    for await (const chunk of result.textStream) {
      assistantReply += chunk;         // accumulate the full reply
      process.stdout.write(chunk);     // print each delta immediately
    }

    process.stdout.write("\n\n");
    history.push({ role: "assistant", content: assistantReply });
  }
}

main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(1);
});
