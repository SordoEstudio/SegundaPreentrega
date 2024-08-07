
export class CustomError extends Error {
    constructor(errorType) {
      super(errorType.message);
      this.code = errorType.code;
      this.status = errorType.status;
    }
  }
  