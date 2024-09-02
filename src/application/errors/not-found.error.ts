export class NotFoundError extends Error {
  private readonly resource: string;
  private readonly id?: string;

  constructor(resource: string, id?: string, message?: string) {
    super(message);
    this.name = 'EmptyResourceError';
    this.message = message ?? 'not found';
    this.resource = resource;
    this.id = id;
  }

  public getMessage(): string {
    return `${this.getFormattedResource()}${this.getFormattedId()} not found`;
  }

  private getFormattedResource(): string {
    return this.resource.charAt(0).toUpperCase() + this.resource.slice(1);
  }

  private getFormattedId(): string {
    return this.id ? ` with id ${this.id}` : '';
  }
}
