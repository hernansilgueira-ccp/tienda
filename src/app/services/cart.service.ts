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
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.load());
  cartItems$ = this.itemsSubject.asObservable();

  private load(): CartItem[] {
    try {
      const json = sessionStorage.getItem(this.storageKey);
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  }

  private persist() {
    const items = this.itemsSubject.value;
    try {
      sessionStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch {}
    this.itemsSubject.next([...items]);
  }

  getCartItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  addToCart(item: CartItem) {
    const items = this.itemsSubject.value;
    const idx = items.findIndex(i => i.id === item.id);
    if (idx > -1) {
      items[idx].quantity += item.quantity;
    } else {
      items.push({ ...item });
    }
    this.persist();
  }

  removeFromCart(i: number) { this.itemsSubject.value.splice(i,1); this.persist(); }
  increaseQuantity(i: number) { this.itemsSubject.value[i].quantity++; this.persist(); }
  decreaseQuantity(i: number) {
    const v = this.itemsSubject.value;
    if (v[i].quantity>1) v[i].quantity--; 
    this.persist();
  }
  clearCart() { sessionStorage.removeItem(this.storageKey); this.itemsSubject.next([]); }
  getTotalPrice(): number {
    return this.itemsSubject.value.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }
}
