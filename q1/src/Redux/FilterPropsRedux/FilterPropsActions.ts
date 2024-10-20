import { createAction } from "@reduxjs/toolkit";
import { IFilterProps } from "../../utils/interfaces/CommonInterfaces";

export const setMainFilter =
  createAction<IFilterProps["mainFilter"]>("SET_MAIN_FILTER");

export const setCurrentPage =
  createAction<IFilterProps["currentPage"]>("SET_CURRENT_PAGE");

export const setSelectedEmailProps = createAction<
  IFilterProps["selectedEmail"]
>("SET_SELECTED_EMAIL_PROPS");
