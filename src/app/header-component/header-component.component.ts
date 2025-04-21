import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from '../components/cart/cart.component';

@Component({
  standalone: true,
  selector: 'app-header-component',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CartComponent
  ],
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent {
  isCartOpen = false;

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart(): void {
    this.isCartOpen = false;
  }
}
