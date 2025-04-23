import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model'; // interfaz del item en el carrito

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = []; // Items actuales en el carrito
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(product: any): void {
    const productId = product.id.toString();
    const existingItem = this.items.find(item => item.id === productId);
    if (existingItem) {
      // Si el producto ya está en el carrito, incrementar su cantidad
      existingItem.quantity += product.quantity;
    } else {
      // Si no está, crear un nuevo CartItem a partir del producto
      const newItem: CartItem = {
        id: productId,
        name: product.nombre || product.name, // tomar el campo disponible
        price: product.precio || product.price,
        imageUrl: product.imageUrl,
        quantity: product.quantity
      };
      this.items.push(newItem);
    }
    // Emitir el nuevo estado del carrito
    this.cartItemsSubject.next([...this.items]);
  }

  removeFromCart(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
      this.cartItemsSubject.next([...this.items]);
    }
  }

  increaseQuantity(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items[index].quantity++;
      this.cartItemsSubject.next([...this.items]);
    }
  }

  decreaseQuantity(index: number): void {
    if (index >= 0 && index < this.items.length) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity--;
        this.cartItemsSubject.next([...this.items]);
      }
      // Si la cantidad es 1, no se reduce más (opcionalmente se podría remover el item)
    }
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart(): void {
    this.items = [];
    this.cartItemsSubject.next([]);
  }
}
