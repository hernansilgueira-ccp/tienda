import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from '../components/cart/cart.component';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [CommonModule, MatIconModule, CartComponent],
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent {
  isCartOpen = false;
  toggleCart() { this.isCartOpen = !this.isCartOpen; }
  closeCart() { this.isCartOpen = false; }
}
