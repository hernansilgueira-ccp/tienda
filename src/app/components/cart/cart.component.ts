// cart.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  couponCode: string = '';
  discountApplied: boolean = false;
  total: number = 0;
  totalWithDiscount: number = 0;
  @Output() cerrarCarrito = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  increaseQty(item: any) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
    this.loadCart();
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
      this.loadCart();
    }
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
    this.loadCart();
  }

  applyCoupon() {
    const applied = this.cartService.applyCoupon(this.couponCode);
    this.discountApplied = applied;
    if (applied) {
      this.totalWithDiscount = this.cartService.getTotalWithDiscount();
    } else {
      this.totalWithDiscount = 0;
    }
  }

  calculateTotal() {
    this.total = this.cartService.getTotal();
    if (this.discountApplied) {
      this.totalWithDiscount = this.cartService.getTotalWithDiscount();
    }
  }
  // cart.component.ts




}
