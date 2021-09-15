export abstract class CustomError extends Error {
  abstract status: number;
  constructor(message: string) {
    super(message);
    //Make the class work correctly after extending from Error
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeError(): { message: string; field?: string }[];
}
