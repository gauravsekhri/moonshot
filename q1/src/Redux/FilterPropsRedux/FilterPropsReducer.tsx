import { createReducer } from "@reduxjs/toolkit";
import {
  setCurrentPage,
  setMainFilter,
  setSelectedEmailProps,
} from "./FilterPropsActions";
import { IFilterProps } from "../../utils/interfaces/CommonInterfaces";

const initialState: IFilterProps = {
  mainFilter: "unread",
  currentPage: 0,
  selectedEmail: {
    date: 0,
    from: { email: "", name: "" },
    id: "",
    short_description: "",
    subject: "",
  },
};

export const filterPropsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setMainFilter, (state, action) => ({
    ...state,
    mainFilter: action.payload,
  }));
  builder.addCase(setCurrentPage, (state, action) => ({
    ...state,
    currentPage: action.payload,
  }));
  builder.addCase(setSelectedEmailProps, (state, action) => ({
    ...state,
    selectedEmail: action.payload,
  }));
});
