
import ReactDOM from "react-dom/client";
import React from "react";
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './pages/ErrorBoundary.jsx'
import CustomerData from "./Context/CustomerData.jsx";
import BpData from "./Context/BpData.jsx";
import BdoData from "./Context/BdoData.jsx";
import MemoryProvider from "./Context/MemoryContext.jsx";

window.addEventListener("error", (event) => {
  if (event.message?.includes("Failed to fetch dynamically imported module")) {
    console.warn(" Reloading due to stale JS chunk...");
    window.location.reload(true);
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <MemoryProvider>
      <CustomerData>
        <BpData>
          <BdoData>
          <App />
          </BdoData>
        </BpData>
      </CustomerData>
      </MemoryProvider>
    </ErrorBoundary>
  </React.StrictMode>
);