import { createReducer } from "@reduxjs/toolkit";
import { setFavEmails, setReadEmails } from "./EmailActions";
import {
  IEmailListItem,
  IEmailReducer,
} from "../../utils/interfaces/CommonInterfaces";

const initialState: IEmailReducer = {
  favEmails: [],
  readEmails: [],
};

export const favEmailsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setFavEmails, (state, action) => ({
    ...state,
    favEmails: action.payload,
  }));
  builder.addCase(setReadEmails, (state, action) => ({
    ...state,
    readEmails: action.payload,
  }));
});
