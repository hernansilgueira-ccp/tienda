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
    this.cartItems.splice(i, 1);             // actualización visual inmediata
    this.cartService.removeFromCart(i);      // y persistencia en el servicio
  }

  getTotal(): number {
    return this.cartService.getTotalPrice();
  }
}
