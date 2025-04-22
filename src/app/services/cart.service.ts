// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'cartItems';

  // BehaviorSubject emits current cart contents
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cartItems$ = this.itemsSubject.asObservable();

  private loadCart(): CartItem[] {
    try {
      const json = sessionStorage.getItem(this.storageKey);
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  }

  private saveAndEmit() {
    try {
      sessionStorage.setItem(
        this.storageKey,
        JSON.stringify(this.itemsSubject.value)
      );
    } catch {}
    // emit a new array copy so subscribers update
    this.itemsSubject.next([...this.itemsSubject.value]);
  }

  getCartItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  addToCart(item: CartItem): void {
    const items = this.itemsSubject.value;
    const idx = items.findIndex(i => i.id === item.id);
    if (idx > -1) {
      items[idx].quantity += item.quantity;
    } else {
      items.push({ ...item });
    }
    this.saveAndEmit();
  }

  removeFromCart(index: number): void {
    const items = this.itemsSubject.value;
    items.splice(index, 1);
    this.saveAndEmit();
  }

  increaseQuantity(index: number): void {
    const items = this.itemsSubject.value;
    items[index].quantity++;
    this.saveAndEmit();
  }

  decreaseQuantity(index: number): void {
    const items = this.itemsSubject.value;
    if (items[index].quantity > 1) {
      items[index].quantity--;
      this.saveAndEmit();
    }
  }

  clearCart(): void {
    sessionStorage.removeItem(this.storageKey);
    this.itemsSubject.next([]);
  }

  getTotalPrice(): number {
    return this.itemsSubject.value.reduce(
      (sum, it) => sum + it.price * it.quantity,
      0
    );
  }
}
