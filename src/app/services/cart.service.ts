// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'cartItems';
  private cartItems: CartItem[] = [];

  constructor() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.cartItems = this.loadCart();
    }
  }

  private loadCart(): CartItem[] {
    try {
      const data = sessionStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveCart(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
      } catch {}
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(item: CartItem): void {
    const existing = this.cartItems.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item });
    }
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  increaseQuantity(index: number): void {
    if (this.cartItems[index]) {
      this.cartItems[index].quantity++;
      this.saveCart();
    }
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index] && this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.saveCart();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }
}
