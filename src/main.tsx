import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./storage/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* wrapping app with redux */}
        <Provider store={store}>
            {/* wrapping app with redux-persist */}
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                {/* wrapping app with router */}
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>
);
