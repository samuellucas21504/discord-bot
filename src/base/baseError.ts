export abstract class BaseError extends Error {
  constructor(message: string, name?: string) {
    super(message);

    if (name) {
      this.name = name;
    }
  }
}
