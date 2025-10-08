
import ReactDOM from "react-dom/client";
import React from "react";
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './pages/ErrorBoundary.jsx'

window.addEventListener("error", (event) => {
  if (event.message?.includes("Failed to fetch dynamically imported module")) {
    console.warn(" Reloading due to stale JS chunk...");
    window.location.reload(true);
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);