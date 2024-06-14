import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./slices/userSlices.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import stepSlices from "./slices/stepSlices.js";
import { itemApi } from "./slices/itemSlices.js";
import { auctionApi } from "./slices/auctionItemSlices.js";
import { convoApi } from "./slices/conversationSlices.js";
import { messageApi } from "./slices/messageSlices.js";
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    stepSlice: stepSlices,
    [itemApi.reducerPath]: itemApi.reducer,
    [auctionApi.reducerPath]: auctionApi.reducer,
    [convoApi.reducerPath]: convoApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(itemApi.middleware)
      .concat(auctionApi.middleware)
      .concat(convoApi.middleware)
      .concat(messageApi.middleware),
});
setupListeners(store.dispatch);

export default store;
