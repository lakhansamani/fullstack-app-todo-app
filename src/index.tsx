import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthorizerProvider } from "@authorizerdev/authorizer-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthorizerProvider
        config={{
          authorizerURL: "https://authorizer-production.up.railway.app",
          redirectURL: window.location.origin,
          clientID: "2a4470cc-3078-4540-a54e-7b93ab776f9b",
        }}
      >
        <App />
      </AuthorizerProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
