import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService, Producto } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponentComponent implements OnInit {
  productos: (Producto & { cantidadSeleccionada: number })[] = [];
  productosAgrupados: (Producto & { cantidadSeleccionada: number })[][] = [];

  constructor(
    private productoService: ProductoService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(list => {
      // Inicializamos cantidadSeleccionada en 1
      this.productos = list.map(p => ({ ...p, cantidadSeleccionada: 1 }));
      // Agrupamos de a 4 para el carrusel
      this.productosAgrupados = this.agruparEnGrupos(this.productos, 4);
    });
  }

  private agruparEnGrupos(
    arr: (Producto & { cantidadSeleccionada: number })[],
    size: number
  ): (Producto & { cantidadSeleccionada: number })[][] {
    const grupos: (Producto & { cantidadSeleccionada: number })[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      grupos.push(arr.slice(i, i + size));
    }
    return grupos;
  }

  decrementar(producto: Producto & { cantidadSeleccionada: number }): void {
    if (producto.cantidadSeleccionada > 1) {
      producto.cantidadSeleccionada--;
    }
  }

  incrementar(producto: Producto & { cantidadSeleccionada: number }): void {
    producto.cantidadSeleccionada++;
  }

  addToCart(producto: Producto & { cantidadSeleccionada: number }): void {
    this.cartService.addToCart(producto);
    producto.cantidadSeleccionada = 1;
  }
}
