import OpenAI from "openai";

const apiKey = process.env.OPEN_API;

if (!apiKey) {
  throw new Error("OPENROUTER_API is not set");
}

const openai = new OpenAI({
  apiKey,
});

export default openai;
