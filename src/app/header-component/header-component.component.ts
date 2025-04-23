import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';  // ← Agregado

@Component({
  standalone: true,
  selector: 'app-header-component',
  host: { '[attr.ngSkipHydration]': 'true' },
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent {
  isCartOpen = false;
  toggleCart() { this.isCartOpen = !this.isCartOpen; }
  closeCart() { this.isCartOpen = false; }
}
