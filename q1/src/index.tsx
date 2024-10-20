import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";
import store from "./Redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
