import { Filter } from "../enums/filterEnum";

export type Gender = Filter.Male | Filter.Female | string;

export type Age = Filter.Age_15_25 | Filter.Age_25 | string;

export type CategoryKey = "a" | "b" | "c" | "d" | "e" | "f" | string;

export type Method = "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
