import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'cartItems';
  private items$ = new BehaviorSubject<CartItem[]>(this.load());
  public cartItems$ = this.items$.asObservable();

  private load(): CartItem[] {
    try {
      const json = sessionStorage.getItem(this.STORAGE_KEY);
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  }

  private saveAndEmit() {
    const list = this.items$.value;
    try { sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(list)); } catch {}
    this.items$.next([...list]);
  }

  getCartItems(): CartItem[] {
    return this.items$.value;
  }

  addToCart(item: CartItem): void {
    const list = this.items$.value;
    const idx = list.findIndex(i => i.id === item.id);
    if (idx > -1) list[idx].quantity += item.quantity;
    else list.push({ ...item });
    this.saveAndEmit();
  }

  removeFromCart(i: number): void {
    const list = this.items$.value; list.splice(i, 1); this.saveAndEmit();
  }

  increaseQuantity(i: number): void {
    this.items$.value[i].quantity++; this.saveAndEmit();
  }

  decreaseQuantity(i: number): void {
    const list = this.items$.value;
    if (list[i].quantity > 1) { list[i].quantity--; this.saveAndEmit(); }
  }

  clearCart(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.items$.next([]);
  }

  getTotalPrice(): number {
    return this.items$.value.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }
}
