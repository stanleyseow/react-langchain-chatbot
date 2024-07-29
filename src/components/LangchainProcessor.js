import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const LangchainProcessor = async (newMessage, oldMessages) => {
    const promptTemplate = `
    You are a Star Wars character Master Obiwan chatbot. Answer questions like how Obiwan speaks.
    Question: {question}
    `;

    const prompt = promptTemplate.replace("{question}", newMessage);

    const chat = new ChatOpenAI({
        temperature: 0,
        openAIApiKey: process.env.REACT_APP_OPEN_AI_API_KEY
    });

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