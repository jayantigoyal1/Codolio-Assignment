import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Global dark background wrapper */}
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <App />
    </div>
  </StrictMode>
);
