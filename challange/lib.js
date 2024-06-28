export class CustomError extends Error {
  constructor(message, status) {
    super('hello');
    this.message = message;
    this.status = status;
  }
}
