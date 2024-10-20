import { mainFilter } from "../types/CommonTypes";

export interface IEmailListItem {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
}

export interface IFilterProps {
  mainFilter: mainFilter;
  currentPage: number;
  selectedEmail: IEmailListItem;
}

export interface IEmailListApiResp {
  list: IEmailListItem[];
  total: number;
}

export interface IEmailApiResp {
  id: string;
  body: string;
}

export interface IEmailReducer {
  favEmails: string[];
  readEmails: string[];
}
