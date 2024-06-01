import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { store } from "./store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
        <ToastContainer closeOnClick theme="dark" />
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>,
);
