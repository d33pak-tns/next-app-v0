import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoReducer from "@/redux/slices/todoSlice";
const persistConfig = {
  key: "root",
  storage,
};

export type RootState = ReturnType<typeof store.getState>;

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
  reducer: {
    todos: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["persistedReducer"],
      },
    }),
});

export const persistor = persistStore(store);
