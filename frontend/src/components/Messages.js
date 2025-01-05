import React from "react";
import { Helmet } from "react-helmet";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";

import Message1 from "../components/Message1";

const Messages = ({ messages, name }) => {
  return (
    <div>
      <Helmet>
        <link rel="stylesheet" href="assets/css/Messages.css" />
      </Helmet>

      {messages.map((message, i) => (
        <div key={i}>
          <Message1 message={message} name={name} />
        </div>
      ))}
    </div>
  );
};
export default Messages;
