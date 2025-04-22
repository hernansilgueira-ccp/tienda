import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(item: CartItem) {
    
    this.cartItems.push(item);
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  increaseQuantity(index: number) {
    if (this.cartItems[index]) {
      this.cartItems[index].quantity++;
    }
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index] && this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  getTotalPrice(): number {
    let total = 0;
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
  }
}
