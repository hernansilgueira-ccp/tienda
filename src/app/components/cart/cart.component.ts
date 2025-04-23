import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
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
    const el = document.getElementById(`item-${i}`);
    if (el) {
      el.classList.add('removing');
      setTimeout(() => {
        this.cartService.removeFromCart(i);
      }, 300);
    }
  }

  getTotal(): number {
    return this.cartService.getTotalPrice();
  }
}
