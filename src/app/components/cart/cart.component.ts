// src/app/components/cart/cart.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  private sub!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // subscribe to updates
    this.sub = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  removeItem(i: number) {
    this.cartService.removeFromCart(i);
  }
  increaseQuantity(i: number) {
    this.cartService.increaseQuantity(i);
  }
  decreaseQuantity(i: number) {
    this.cartService.decreaseQuantity(i);
  }
  clearCart() {
    this.cartService.clearCart();
  }
  getTotal(): number {
    return this.cartService.getTotalPrice();
  }
}
