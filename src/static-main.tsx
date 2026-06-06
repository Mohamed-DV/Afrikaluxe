import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "@/components/afrikaluxe/HomePage";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
);
