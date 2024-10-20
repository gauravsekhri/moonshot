import axios from "axios";
import {
  IEmailApiResp,
  IEmailListApiResp,
} from "./interfaces/CommonInterfaces";

export const getAllEmails = (): Promise<IEmailListApiResp> => {
  return new Promise((res, rej) => {
    axios
      .get(`https://flipkart-email-mock.vercel.app`)
      .then((resp) => {
        res(resp.data);
      })
      .catch((err) => console.log(err));
  });
};

export const getEmailsByPage = (page: number): Promise<IEmailListApiResp> => {
  return new Promise((res, rej) => {
    axios
      .get(`https://flipkart-email-mock.vercel.app/?page=${page ?? 1}`)
      .then((resp) => {
        res(resp.data);
      })
      .catch((err) => console.log(err));
  });
};

export const getEmailById = (page: number): Promise<IEmailApiResp> => {
  return new Promise((res, rej) => {
    axios
      .get(`https://flipkart-email-mock.vercel.app/?id=${page ?? 1}`)
      .then((resp) => {
        res(resp.data);
      })
      .catch((err) => console.log(err));
  });
};
