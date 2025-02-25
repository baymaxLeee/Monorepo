// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-452708c4ad854511bdad4b30d434dd32'
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
  });

  console.log('111', completion.choices[0].message.content);
}

main();