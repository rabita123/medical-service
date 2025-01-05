import React from "react";
import { Helmet } from "react-helmet";

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <Helmet>
      <link rel="stylesheet" href="assets/css/Input.css" />
    </Helmet>
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
