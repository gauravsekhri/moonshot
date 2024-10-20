import axios, { AxiosHeaders, AxiosRequestConfig, Method } from "axios";
import { ApiResponse } from "../interfaces/Commoninterfaces";
import { toast } from "sonner";

const request = async (
  url: string,
  method: Method,
  data?: any,
  headers?: AxiosHeaders
): Promise<ApiResponse> => {
  return new Promise((res, rej) => {
    const config: AxiosRequestConfig = {
      method: method,
      url: `${process.env.REACT_APP_BACKEND_BASE_URL}` + url,
      ...(data && { data: data }),
    };

    axios(config)
      .then((response) => {
        res(response.data);
      })
      .catch((err: any) => toast.error(err?.message));
  });
};

export default request;
