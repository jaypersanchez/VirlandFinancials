import React from "react";
import ReactDOMClient from "react-dom/client";
import { MainDashboardFrame } from "./screens/MainDashboardFrame";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<MainDashboardFrame />);
