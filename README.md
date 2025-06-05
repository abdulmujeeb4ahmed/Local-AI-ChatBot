# **Local AI ChatBot:**
- A simple, TypeScript-based command-line chatbot that runs on your local machine using [OpenRouter](https://openrouter.ai/)’s free-tier API. It streams responses in real time and lets you switch models with a single line change—no extra API keys or code changes needed.

**Features**
- **Streaming Chat:**
  - Sends user messages to an LLM and prints tokens as they arrive for a real-time streaming experience.
- **Model-Agile:**
  - Switch between OpenRouter-compatible models by changing one line in `index.ts`. No need for extra API keys or rewriting logic.
- **TypeScript CLI App:**
  - Written in TypeScript and runnable via `ts-node` or compiled to JavaScript. Minimal dependencies—just Node.js + OpenRouter SDK.

**Prerequisites**
- **Node.js** v16 or higher
- **pnpm** (preferred) _or_ npm / yarn
- **OpenRouter API key** (free tier available at [https://openrouter.ai](https://openrouter.ai/))

**Installation**
- **Clone this repository:**
    ```bash
    git clone https://github.com/abdulmujeeb4ahmed/Local-AI-ChatBot.git
    cd Local-AI-ChatBot
    ```
- **Install dependencies:**
  - With `pnpm` (recommended):
    ```bash
    pnpm install
    ```
  - Or with npm:
    ```bash
    npm install
    ```
  - Or with yarn:
    ```bash
    yarn install
    ```
- **Create your `.env` file:**  
  - Copy the example below under Environment Variables and fill in your API key.
- **Ignore `.env` in Git:**  
  - Ensure `.gitignore` contains:
    ```
    .env
    ```
  - This keeps your API key local.

**Environment Variables**
- Create a `.env` file in the project root with at least:
    ```
    OPENROUTER_API_KEY=your_openrouter_api_key_here
    OPENAI_API_BASE=https://openrouter.ai/api/v1
    ```
  - **OPENROUTER_API_KEY** – Your personal OpenRouter key (free tier works).
  - **OPENAI_API_BASE** – Base URL for OpenRouter’s OpenAI-compatible endpoint (default: `https://openrouter.ai/api/v1`).
- You can add other variables if you update `index.ts`, but nothing else is required for basic use.

**Usage**
- **Compile & Run (TypeScript):**
  - If `ts-node` is installed globally:
    ```bash
    npx ts-node index.ts
    ```
  - Or use an npm script (if defined):
    ```bash
    pnpm start
    ```
  - (Replace `pnpm` with `npm run` or `yarn` if you prefer.)
- **Chat in Real Time:**
  - When the program starts, type your question or message.
  - The bot streams tokens back as it generates them, creating a live chat feel.
  - Exit by pressing `Ctrl+C` (or your configured exit command).

**Configuration**
- **Switching Models:**  
  - In `index.ts`, locate:
    ```ts
    const model = openrouter.chat("deepseek/deepseek-r1:free");
    ```
  - Replace `"deepseek/deepseek-r1:free"` with any model name you prefer, for example:
    ```ts
    const model = openrouter.chat("another-model/awesome-model:free");
    ```
  - All models under your OpenRouter account use the same API key, so no extra steps are needed—just save and restart.

**Project Structure**
```text
Local-AI-ChatBot/
├── .gitignore
├── .env.example        ← Example of required environment variables
├── index.ts            ← Main chatbot entrypoint (TypeScript)
├── package.json        ← Scripts & dependency info
├── pnpm-lock.yaml      ← Lockfile (if you use pnpm)
└── README.md           ← ← (You are here)
