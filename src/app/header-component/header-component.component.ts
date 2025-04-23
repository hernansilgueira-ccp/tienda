import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../components/cart/cart.component';

@Component({
  standalone: true,
  selector: 'app-header-component',
  imports: [CommonModule, CartComponent],
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent {}
