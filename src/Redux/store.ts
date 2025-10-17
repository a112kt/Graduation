import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

