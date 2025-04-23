import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductoService } from '../services/product.service';
import { CartService } from '../services/cart.service';
// (Opcional: importar modelo Product o CartItem si existe)

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Lista de productos; usar "any" o definir una interfaz que incluya 'quantity'
  productosAgrupados: any[][] = [];

  constructor(private productService: ProductoService, private cartService: CartService) { }



ngOnInit(): void {
  this.productService.getProductos().subscribe((productos) => {
    this.products = productos.map(prod => ({
      ...prod,
      quantity: 1
    }));
    this.productosAgrupados = this.agruparEnGrupos(this.products, 4);
  });
}

private agruparEnGrupos(productos: any[], cantidad: number): any[][] {
  const grupos = [];
  for (let i = 0; i < productos.length; i += cantidad) {
    grupos.push(productos.slice(i, i + cantidad));
  }
  return grupos;
}

  incrementQuantity(product: any): void {
    product.quantity++;
  }

  decrementQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  addToCart(product: any): void {
    // Llamar al servicio del carrito para agregar el producto con la cantidad seleccionada
    this.cartService.addToCart(product);
    // Reiniciar la cantidad a 1 luego de agregar al carrito (opcional, para futuras selecciones)
    product.quantity = 1;
  }
}
