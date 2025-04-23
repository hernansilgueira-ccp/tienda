import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
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
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  private sub!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.sub = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  removeItem(i: number): void { 
    this.cartService.removeFromCart(i); 
  }

  increase(i: number): void { 
    this.cartService.increaseQuantity(i); 
  }

  decrease(i: number): void { 
    this.cartService.decreaseQuantity(i); 
  }

  clearCart(): void { 
    this.cartService.clearCart(); 
  }

  getTotal(): number { 
    return this.cartService.getTotalPrice(); 
  }
}
