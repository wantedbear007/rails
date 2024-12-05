


export default class ApiResponse<T> {
  public success: boolean;
  public data?: T;
  public message?: string;
  public error?: string;
  public serverError?: string;

  constructor(
    success: boolean,
    options?: {
      data?: T;
      message?: string;
      error?: string;
      serverError?: string;
    }
  ) {
    this.success = success;
    if (options?.data) {
      this.data = options.data;
    }
    if (options?.message) {
      this.message = options.message;
    }
    if (options?.error) {
      this.error = options.error;
    }

    if (options?.serverError) {
      this.serverError = options.serverError;
    }
  }
}
