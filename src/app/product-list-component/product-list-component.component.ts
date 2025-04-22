// src/app/product-list-component/product-list-component.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../services/cart.service';
import { ProductoService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponentComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private productoService: ProductoService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe(list => this.productos = list);
  }

  addToCart(producto: any) {
    this.cartService.addToCart({
      id: producto.id.toString(),       // asegurar string
      name: producto.nombre,
      price: producto.precio,
      imageUrl: producto.imagenUrl,
      quantity: 1
    });
  }

  getQuantity(productId: string): number {
    const item = this.cartService.getCartItems().find(i => i.id === productId);
    return item ? item.quantity : 0;
  }
}
