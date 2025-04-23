import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';  // interfaz del item en carrito

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];  // Items actuales en el carrito

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(product: any): void {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      // Si el producto ya está en el carrito, incrementar su cantidad
      existingItem.quantity += product.quantity;
    } else {
      // Si no está, crear un nuevo CartItem a partir del producto
      const newItem: CartItem = {
        id: product.id,
        name: product.nombre || product.name,      // tomar el campo disponible
        price: product.precio || product.price,
        imageUrl: product.imageUrl,
        quantity: product.quantity
      };
      this.items.push(newItem);
    }
  }

  clearCart(): void {
    this.items = [];
  }

  // (Opcionalmente, métodos para remover un item o ajustar cantidad podrían implementarse aquí)
}
