import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './cart.component.html', 
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeItem(i: number) {
    this.cartService.removeFromCart(i);
    this.cartItems = this.cartService.getCartItems();
  }
  increaseQuantity(i: number) {
    this.cartService.increaseQuantity(i);
    this.cartItems = this.cartService.getCartItems();
  }
  decreaseQuantity(i: number) {
    this.cartService.decreaseQuantity(i);
    this.cartItems = this.cartService.getCartItems();
  }
  clearCart() {
    this.cartService.clearCart();
    this.cartItems = this.cartService.getCartItems();
  }
  getTotal(): number {
    return this.cartService.getTotalPrice();
  }
}
