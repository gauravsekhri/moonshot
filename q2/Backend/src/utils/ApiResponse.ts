interface IAPIResponse {
  success: boolean;
  statusCode: Number;
  message: string;
  data: any;
}

class ApiResponse implements IAPIResponse {
  constructor(
    public success: boolean,
    public statusCode: Number,
    public message: string,
    public data: any,
  ) {}
}

export default ApiResponse;
