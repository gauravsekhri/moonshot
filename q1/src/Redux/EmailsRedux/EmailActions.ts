import { createAction } from "@reduxjs/toolkit";

export const setFavEmails = createAction<string[]>("SET_FAV_EMAILS");

export const setReadEmails = createAction<string[]>("SET_READ_EMAILS");
