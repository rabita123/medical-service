import { event } from "jquery";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join room</h1>
        <div>
          {" "}
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          {" "}
          <input
            placeholder="Room"
            className="joinInput"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link onClick={event=>(!name ||!room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
          <button className="button" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
