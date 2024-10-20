import { combineReducers } from "@reduxjs/toolkit";
import { filterPropsReducer } from "./FilterPropsRedux/FilterPropsReducer";
import { persistReducer } from "redux-persist";
import { favEmailsReducer } from "./EmailsRedux/EmailReducer";
import storage from "redux-persist/lib/storage";

export const rootReducer = combineReducers({
  filterProps: filterPropsReducer,
  metaData: favEmailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
