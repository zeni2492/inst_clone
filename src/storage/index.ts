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
    key: "root",
    storage,
    whitelist: ["user"],
};

// Оборачиваем редьюсер с persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем store с persistedReducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/REGISTER",
                ],
            },
        }),
});

// Создаем persistor
const persistor = persistStore(store);

export { store, persistor };
