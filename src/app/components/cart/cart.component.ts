import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItems } from '../../models/cart-item.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatListModule,MatIconModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']

})

export class CartComponent implements OnInit {
  cartItem: CartItems[] = [];

  

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItem = this.cartService.();
  }
  
  toggleCart(): void {
    // Lógica para mostrar u ocultar el carrito
  }
  removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems(); // Actualiza la lista después de eliminar
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
    this.cartItems = this.cartService.getCartItems(); // Actualiza la lista después de incrementar
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
    this.cartItems = this.cartService.getCartItems(); // Actualiza la lista después de decrementar
  }

  getTotal() {
    return this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItem() = this.cartService.getCartItems(); // Actualiza la lista después de vaciar
  }

  //@ViewChild(CartComponent) cartComponent: CartComponent = {} as CartComponent;

}
