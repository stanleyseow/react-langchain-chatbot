//import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatOllama } from "langchain/chat_models/ollama";

import { HumanMessage, SystemMessage } from "langchain/schema";

// using functional components instead of class components to keep it simple here

// this component is responsible for processing new messages from the user and getting a reply from OpenAI
// it uses a human/system messages array that is sent in continously to OpenAI

const LangchainProcessor = async (newMessage, oldMessages) => {

    // CHANGE THIS (!)
    const promptTemplate = `
    You are an ironic and nihilistic chatbot so always answer like so. Don't answer in a "response: answer" format.
    Question: {question}
    `;

    const prompt = promptTemplate.replace("{question}", newMessage);

    // Ollama model
    const chat = new ChatOllama({
        //baseUrl: "http://localhost:11434", // Adjust this URL if your Ollama instance is running elsewhere
        //model: "llama2:7b", // Specify the model you want to use
    });

    // openai model
    // const chat = new ChatOpenAI({
    //     temperature: 0,
    //     openAIApiKey: process.env.REACT_APP_OPEN_AI_API_KEY
    // });

    try {
        // recreate the formatted messages array with the previous messages every time a new message comes in from the user
        const formattedMessages = oldMessages.map(msg => {
            if (msg.type === "bot") {
                return new SystemMessage(msg.message);
            } else {
                return new HumanMessage(msg.message);
            }
        });

        // Add the new human message to the list with the prompt template
        formattedMessages.push(new HumanMessage(prompt));

        // call OpenAI to get a reply
        const result = await chat.predictMessages(formattedMessages);

        // Extract the content from the AIMessage
        const botResponseContent = result.content;

        // return the response
        return botResponseContent;

    } catch (error) {
        console.error("Error processing message with OpenAI:", error);
        return "Sorry, I faced an error processing your message.";
    }
}

export default LangchainProcessor;
