//import { ChatOpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/ollama";

import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const LangchainProcessor = async (newMessage, oldMessages) => {
    const promptTemplate = `
    You are a crypto chatbot. Answer questions like how crypto dude speak. Randomly throw in cryto slangs like WAGMI, HOLD, etc. 
    Question: {question}
    `;

    const prompt = promptTemplate.replace("{question}", newMessage);

        // Ollama model
        const chat = new ChatOllama({
            baseUrl: "http://localhost:11434", // Adjust this URL if your Ollama instance is running elsewhere
            //model: "llama2:7b", 
            model: "qwen2.5:1.5b", 
        });

    // const chat = new ChatOpenAI({
    //     temperature: 0,
    //     openAIApiKey: process.env.REACT_APP_OPEN_AI_API_KEY
    // });

    try {
        const formattedMessages = oldMessages.map(msg => {
            if (msg.type === "bot") {
                return new SystemMessage(msg.message);
            } else {
                return new HumanMessage(msg.message);
            }
        });

        formattedMessages.push(new HumanMessage(prompt));

        const result = await chat.invoke(formattedMessages);

        return result.content;

    } catch (error) {
        console.error("Error processing message with OpenAI:", error);
        return "Sorry, I faced an error processing your message.";
    }
}

export default LangchainProcessor;