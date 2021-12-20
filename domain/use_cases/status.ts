export class Status {
  was_successful: boolean;
  message: string;

  constructor(wasSuccessful: boolean, message: string = "") {
    this.was_successful = wasSuccessful;
    this.message = message;
  }

  wasSuccessful = (): boolean => {
    return this.was_successful;
  }

  getMessage = (): string => {
    return this.message;
  }
}
