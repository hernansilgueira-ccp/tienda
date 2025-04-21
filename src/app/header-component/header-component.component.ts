import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-header-component',
  imports: [CommonModule, MatIconModule],
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent {
  isCartOpen = false;
  items: any[] = []; // tu modelo de carrito

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
  closeCart() {
    this.isCartOpen = false;
  }
}
