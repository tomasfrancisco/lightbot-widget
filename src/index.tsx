import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./modules/App/App";

function init() {
  const getAgentId = () => {
    const element = document.getElementById("lightbot-widget");
    let agentId;
    if (element) {
      agentId = element.getAttribute("data-agent-id");
    } else {
      agentId = "4565b699-6d3a-4915-9722-f00fc9f1a032"; // Test agent id, configured the same in lightbot-backend
    }
    return agentId;
  };

  const rootElement = document.createElement("div");
  rootElement.id = "lightbot";

  document.body.appendChild(rootElement);

  ReactDOM.render(<App agentId={getAgentId()} />, rootElement);
}

if (document.readyState === "complete") {
  init();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
