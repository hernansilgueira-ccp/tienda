import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../services/cart.service';
import { ProductoService, Producto } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe(list => this.productos = list);
  }

  addToCart(p: Producto) {
    this.cartService.addToCart({
      id: p.id!.toString(),
      name: p.nombre,
      price: p.precio,
      imageUrl: p.imagen,
      quantity: 1
    });
  }

  getQuantity(id: string): number {
    const found = this.cartService.getCartItems().find(i => i.id === id);
    return found ? found.quantity : 0;
  }
}
