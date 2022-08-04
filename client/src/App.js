import React from "react";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "localhost:3002/";

function App() {
  // Before Login
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [room, setRoom] = React.useState("");
  const [userName, setUserName] = React.useState("");

  // After Login
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  //For connection scoket.io
  React.useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, []);

  //for receive message
  React.useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  //for connection in a room
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  //for sending message
  const sendMessage = async () => {
    if (message === "") {
    } else {
      let messageContent = {
        room: room,
        content: {
          author: userName,
          message: message,
        },
      };

      await socket.emit("send_message", messageContent);
      setMessageList([...messageList, messageContent.content]);
      setMessage("");
    }
  };

  return (
    <div className="h-screen flex items-center w-full">
      {!loggedIn ? (
        <div className="w-full md:w-[35rem] mx-auto p-10">
          <div className="grid">
            <div className="mb-4">
              <label
                htmlFor="yourName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="yourName"
                placeholder="Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="roomNo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Room No.
              </label>
              <input
                id="roomNo"
                type="number"
                placeholder="Room No"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={connectToRoom}
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="w-full md:w-[35rem] mx-auto relative">
          <div className="h-screen overflow-y-auto border rounded p-1.5 shadow-xl">
            {messageList.map((val, key) => {
              return (
                <div
                  key={key}
                  id={val.author === userName ? "You" : "Other"}
                  className={
                    val.author === userName
                      ? "flex justify-end my-1"
                      : "flex justify-start my-1"
                  }
                >
                  <div
                    className={
                      val.author === userName
                        ? "bg-[#056162] rounded-tl-lg rounded-bl-lg text-gray-200 rounded-br-lg px-3 py-1 grid"
                        : "bg-[#262d31] rounded-tr-lg text-gray-200 rounded-bl-lg rounded-br-lg px-3 py-1 grid"
                    }
                  >
                    <span className="text-xs">{val.author}</span>
                    <span className="text-lg">{val.message}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute w-full bottom-1 flex">
            <input
              type="text"
              value={message}
              placeholder="Message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
