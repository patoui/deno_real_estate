export class Status {
  was_successful: boolean;
  message: string;
  data: { [key: string]: unknown };

  constructor(wasSuccessful: boolean, message: string = "", data: { [key: string]: unknown } = {}) {
    this.was_successful = wasSuccessful;
    this.message = message;
    this.data = data;
  }

  wasSuccessful = (): boolean => {
    return this.was_successful;
  }

  getMessage = (): string => {
    return this.message;
  }

  getData = (): { [key: string]: unknown } => {
    return this.data;
  }
}
