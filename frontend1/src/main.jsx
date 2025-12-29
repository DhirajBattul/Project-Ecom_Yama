import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./Context/Context.jsx";
import ErrorBoundary from "./components/ErrorBoundary";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AppProvider>
  </React.StrictMode>
);