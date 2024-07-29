import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

import ActionProvider from "./components/ActionProvider";
import MessageParser from "./components/MessageParser";
import config from "./components/Config";

// we're using react-chatbot-kit to create the chatbot. See their docs here: https://fredrikoseberg.github.io/react-chatbot-kit-docs/docs
// we're using tailwindcss to style
// we're using OpenAI via langchain to process messages

function App() {
  return (
    <div className="App flex justify-center items-center h-screen bg-purple-200">
      {/* <header className="App-header w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"> */}
      <div className="min-h-full w-full">
        <h1 className="text-3xl font-bold">Main Page</h1>


        <div className="fixed bottom-5 right-4">
          <div className="bg-white rounded-lg shadow-xl w-80 h-50 flex flex-col">
            <div className="text-grey-400 p-2 rounded-t-lg flex justify-between items-center">
              {/* Add the Chatbot component to the header */}
              <Chatbot
                headerText='StarWars Chatbot'
                placeholderText='Ask your question,my padawan'
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
