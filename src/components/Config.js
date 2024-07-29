  // Config starter code
  import { createChatBotMessage } from "react-chatbot-kit";
  
  const config = {
    // change this to the message you want to be sent to the user when they first open the chatbot
    initialMessages: [createChatBotMessage(`Hey there, I am a Star Wars bot!`)],
    customStyles: {
        botMessageBox: {
          backgroundColor: '#376B7E',
        },
        chatButton: {
          backgroundColor: '#5ccc9d',
        },
      },
  }
  
  export default config