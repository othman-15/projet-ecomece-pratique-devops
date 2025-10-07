import { ShoppingCartItem } from "./ShoppingCartItem";
import { Product } from "./Product";

export class ShoppingCart {
  private _items: ShoppingCartItem[] = [];

  public addProduct(product: Product, quantity: number = 1): void {
    const existingItem = this.findItem(product);

    if (existingItem) {
      existingItem.addQuantity(quantity);
    } else {
      const newItem = new ShoppingCartItem(new Product(product.productID), quantity);
      // Copier les propriétés
      Object.assign(newItem.product, product);
      this._items.push(newItem);
    }
  }

  public removeProduct(product: Product): void {
    const index = this._items.findIndex(item =>
      item.product.productID === product.productID &&
      item.product.selectedColor === product.selectedColor
    );

    if (index !== -1) {
      this._items.splice(index, 1);
    }
  }

  public updateQuantity(product: Product, newQuantity: number): void {
    const item = this.findItem(product);
    if (item) {
      item.quantity = newQuantity;
    }
  }

  private findItem(product: Product): ShoppingCartItem | undefined {
    return this._items.find(item =>
      item.product.productID === product.productID &&
      item.product.selectedColor === product.selectedColor
    );
  }

  public get items(): ShoppingCartItem[] {
    return [...this._items];
  }

  public get totalItems(): number {
    return this._items.reduce((sum, item) => sum + item.quantity, 0);
  }

  public get totalPrice(): number {
    return this._items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  public clear(): void {
    this._items = [];
  }

  public displayCart(): string {
    return this._items.map(item => item.displayDetails()).join('\n') +
      `\nTotal: ${this.totalPrice}DH (${this.totalItems} articles)`;
  }
}
