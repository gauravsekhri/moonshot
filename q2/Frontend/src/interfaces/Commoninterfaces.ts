import { Age, Gender, CategoryKey } from "../types/CommonTypes";

export interface IParticipant {
  day: Date;
  age: Age;
  gender: Gender;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export interface IFilters {
  startDate: string | Date;
  endDate: string | Date;
  age: Age;
  gender: Gender;
  category: CategoryKey;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: any;
}
