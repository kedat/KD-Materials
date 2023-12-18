import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick.css";
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import "./index.css";
import { persistor, store } from "./redux/store";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer />
      <App />

    </PersistGate>
  </Provider>
);
