import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartComponent } from '../components/cart/cart.component';

@Component({
  standalone: true,
  selector: 'app-header-component',
  host: { '[attr.ngSkipHydration]': 'true' },
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CartComponent
  ],
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent {}
