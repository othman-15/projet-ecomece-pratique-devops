import { Product } from "./Product";

export class ShoppingCartItem {
  private _product: Product;
  private _quantity: number;

  constructor(product: Product, quantity: number = 1) {
    this._product = product;
    this._quantity = quantity;
  }

  public get product(): Product {
    return this._product;
  }

  public get quantity(): number {
    return this._quantity;
  }
  public set quantity(value: number) {
    this._quantity = Math.max(1, value);
  }

  public addQuantity(amount: number = 1): void {
    this._quantity += amount;
  }

  public subtractQuantity(amount: number = 1): void {
    this._quantity = Math.max(1, this._quantity - amount);
  }

  public get totalPrice(): number {
    return this._product.productPrice * this._quantity;
  }

  public displayDetails(): string {
    return `${this._product.productTitle} - ${this._quantity} x ${this._product.productPrice}DH = ${this.totalPrice}DH` +
      (this._product.selectedColor ? ` (Couleur: ${this._product.selectedColor})` : '');
  }
}
