import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductoService } from '../services/product.service';
import { CartService } from '../services/cart.service';
// (Opcional: importar modelo Product o CartItem si existe)

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];  // Lista de productos; usar "any" o definir una interfaz que incluya 'quantity'

  constructor(private productService: ProductoService, private cartService: CartService) { }

  ngOnInit(): void {
    // Obtener productos del servicio
    this.productService.getProductos().subscribe(productos => {
      // Asegurarse de agregar la propiedad quantity a cada producto, inicializada en 1
      this.products = productos.map(prod => {
        return { ...prod, quantity: 1 };  // copia todos los campos del producto y añade quantity
      });
    });
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
