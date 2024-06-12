import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./slices/userSlices.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import stepSlices from "./slices/stepSlices.js";
import { itemApi } from "./slices/itemSlices.js";
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    stepSlice: stepSlices,
    [itemApi.reducerPath]: itemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(itemApi.middleware),
});
setupListeners(store.dispatch);

export default store;
