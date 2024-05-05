import { configureStore } from "@reduxjs/toolkit";
import { rickMortyApi } from "./Api/rickMortyApi";

export const store = configureStore({
  reducer: {
    [rickMortyApi.reducerPath]: rickMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rickMortyApi.middleware)
})