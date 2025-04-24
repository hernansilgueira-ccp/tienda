// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  private descuento = 0;
  
  getCart() {
    return this.cart;
  }
  getDescuento() {
    return this.descuento;
  }
  
  addToCart(product: any): void {
    const existing  = this.cart.find(item => item.id === product.id);
    
    if (existing ) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...product });
    }
  }

  removeFromCart(id: number): void {
    this.cart = this.cart.filter(item => item.id !== id);
  }

  updateQuantity(id: number, quantity: number): void {
    const item = this.cart.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
    }
  }

  clearCart() {
    this.cart = [];
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  }

private coupons: { [code: string]: number } = {
  'DESCUENTO10': 0.10, // 10%
  'MITIENDA25': 0.25   // 25%
};

private appliedDiscount = 0;

applyCoupon(code: string): boolean {
  if (code.length !== 8) return false;

  const porcentajeStr = code.slice(-2); // últimos 2 caracteres
  const porcentaje = parseInt(porcentajeStr, 10);

  if (!isNaN(porcentaje) && porcentaje > 0 && porcentaje <= 99) {
    this.descuento = porcentaje;
    return true;
  }
  return false;
}

getTotalWithDiscount() {
  const total = this.getTotal();
  return total * ((100 - this.descuento) / 100);
}

}

