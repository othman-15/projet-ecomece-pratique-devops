import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';

interface ICartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ICartItem[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  private cartTotal = new BehaviorSubject<number>(0);

  cartCount$ = this.cartItemCount.asObservable();
  cartTotal$ = this.cartTotal.asObservable();

  constructor(private http: HttpClient) {}

  addToCart(product: Product, quantity: number = 1, color?: string): void {
    const productCopy = Product.from(product);

    const existingItem = this.cartItems.find(
      item => item.product.productID === productCopy.productID &&
        item.selectedColor === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        product: productCopy,
        quantity,
        selectedColor: color
      });
    }
    this.updateCartStats();
  }

  updateQuantity(productID: string, newQuantity: number, color?: string): void {
    const item = this.cartItems.find(
      item => item.product.productID === productID &&
        item.selectedColor === color
    );

    if (item) {
      item.quantity = Math.max(1, newQuantity);
      this.updateCartStats();
    }
  }

  removeFromCart(productID: string, color?: string): void {
    this.cartItems = this.cartItems.filter(
      item => !(item.product.productID === productID &&
        item.selectedColor === color)
    );
    this.updateCartStats();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartStats();
  }

  getItems(): ICartItem[] {
    return this.cartItems.map(item => ({
      ...item,
      product: Product.from(item.product)
    }));
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.product.productPrice * item.quantity),
      0
    );
  }

  getTotalItems(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  placeOrder(orderPayload: any) {
    return this.http.post('http://localhost:8083/api/orders', orderPayload);
  }

  private updateCartStats(): void {
    this.cartItemCount.next(this.getTotalItems());
    this.cartTotal.next(this.getTotalPrice());
  }
}
