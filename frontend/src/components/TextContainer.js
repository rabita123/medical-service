import React from "react";
import { Helmet } from "react-helmet";
// import onlineIcon from "../../icons/onlineIcon.png";

const TextContainer = ({ users }) => (
  <div>
    <Helmet>
      <link rel="stylesheet" href="assets/css/TextContainer.css" />
    </Helmet>
    <div className="textContainer">
      <div>
        <h1>
          Realtime Chat Application{" "}
          <span role="img" aria-label="emoji">
            💬
          </span>
        </h1>
        <h2>
          Created with React, Express, Node and Socket.IO{" "}
          <span role="img" aria-label="emoji">
            ❤️
          </span>
        </h2>
        <h2>
          Try it out right now!{" "}
          <span role="img" aria-label="emoji">
            ⬅️
          </span>
        </h2>
      </div>
      {users ? (
        <div>
          <h1>People currently chatting:</h1>
          <div className="activeContainer">
            <h2>
              {users.map(({ name }) => (
                <div key={name} className="activeItem">
                  {name}
                  <img alt="Online Icon" />
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  </div>
);

export default TextContainer;
