export class InsufficientStockError extends Error {
  constructor(productId: string) {
    super(`Insufficient stock for product with id ${productId}`);
    this.name = 'InsufficientStockError';
  }
}
