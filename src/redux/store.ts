// import { configureStore } from "@reduxjs/toolkit";
// import { TodoState } from "@/redux/slices/todoSlice";
// import storage from "redux-persist/lib/storage";
// import { persistStore, persistReducer } from "redux-persist";
// import type { PersistConfig } from "redux-persist";
// import todoReducer from "@/redux/slices/todoSlice";

// const PersistConfig: PersistConfig<TodoState> = {
//   key: "root",
//   storage,
//   whitelist: ["todos"],
// };

// const persistedTodoReducer = persistReducer(PersistConfig, todoReducer);

// export const store = configureStore({
//   reducer: {
//     todos: persistedTodoReducer,
//   },
// });


// export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>;


// store.ts
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
});

export const persistor = persistStore(store);
