export class NotFoundError extends Error {
  private readonly resource: string;

  constructor(resource: string, message?: string) {
    super(message);
    this.name = 'EmptyResourceError';
    this.message = message ?? 'not found';
    this.resource = resource;
  }

  public getMessage(): string {
    return `${this.getFormattedResource()} not found`;
  }

  private getFormattedResource(): string {
    return this.resource.charAt(0).toUpperCase() + this.resource.slice(1);
  }
}
