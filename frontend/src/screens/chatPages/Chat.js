import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Notifications, { notify } from "react-notify-toast";
import Input from "../../components/Input";
import InfoBar from "../../components/InfoBar";
import Messages from "../../components/Messages";

import { Helmet } from "react-helmet";
const ENDPOINT = "http://xpertsample.herokuapp.com/";
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    // var myNotification = new Notify("Yo dawg!", {
    //   body: "This is an awesome notification",
    //   notifyShow: onNotifyShow,
    // });

    // const onNotifyShow = () => {
    //   window.location.reload(false);
    // };
    // myNotification.show();
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    notify.show(message);
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="assets/css/chat.css" />
      </Helmet>
      <Helmet>
        <link rel="stylesheet" href="assets/css/Input.css" />
      </Helmet>

      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />

          <Messages messages={messages} name={name} />
          <Notifications />

          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
