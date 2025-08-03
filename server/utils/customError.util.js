class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'Fail' : 'Error';
    this.success = false;
    this.isOperation = true;

    Error.captureStackTrace(this, CustomError);
  }
}

export default CustomError;
