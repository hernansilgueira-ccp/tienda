import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ProductoService } from '../services/product.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ProductoService],
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponent implements OnInit {
  products = [];

  constructor(
    private productService: ProductoService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProductos().subscribe(list => this.products = list);
  }

  addToCart(product: any) {
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    });
  }

  getQuantity(productId: string): number {
    const item = this.cartService.getCartItems().find(i => i.id === productId);
    return item ? item.quantity : 0;
  }
}
