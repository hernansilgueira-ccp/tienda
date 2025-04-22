import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'cartItems';
  private items$ = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  public cartItems$ = this.items$.asObservable();

  private loadFromStorage(): CartItem[] {
    try {
      const json = sessionStorage.getItem(this.storageKey);
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  }

  private saveAndPublish() {
    const items = this.items$.value;
    try {
      sessionStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch {}
    this.items$.next([...items]);
  }

  getCartItems(): CartItem[] {
    return this.items$.value;
  }

  addToCart(item: CartItem): void {
    const items = this.items$.value;
    const idx = items.findIndex(i => i.id === item.id);
    if (idx > -1) items[idx].quantity += item.quantity;
    else items.push({ ...item });
    this.saveAndPublish();
  }

  removeFromCart(i: number): void {
    const items = this.items$.value;
    items.splice(i, 1);
    this.saveAndPublish();
  }

  increaseQuantity(i: number): void {
    this.items$.value[i].quantity++;
    this.saveAndPublish();
  }

  decreaseQuantity(i: number): void {
    const items = this.items$.value;
    if (items[i].quantity > 1) items[i].quantity--;
    this.saveAndPublish();
  }

  clearCart(): void {
    sessionStorage.removeItem(this.storageKey);
    this.items$.next([]);
  }

  getTotalPrice(): number {
    return this.items$.value.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }
}
