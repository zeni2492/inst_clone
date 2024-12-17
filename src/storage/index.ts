import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // импорт storage из redux-persist
import userReducer from "./userSlice";

// Корневой редьюсер с использованием combineReducers
const rootReducer = combineReducers({
    user: userReducer,
});

// Конфигурация persist
const persistConfig = {
    key: "root", // key for storage
    storage, // storage
    whitelist: ["user"], // only user will be persisted
};

// Оборачиваем редьюсер с persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем store с persistedReducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // disable default serializableCheck
        }),
});

// create persistor
const persistor = persistStore(store);

export { store, persistor };
