import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponentComponent implements OnInit {
  productos: Producto[] = [];
  productosAgrupados: Producto[][] = [];

  constructor(
    private productoService: ProductoService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
      this.productosAgrupados = this.agruparProductos(this.productos, 4);
    });
  }

  private agruparProductos(arr: Producto[], tamanoGrupo: number): Producto[][] {
    const grupos: Producto[][] = [];
    for (let i = 0; i < arr.length; i += tamanoGrupo) {
      grupos.push(arr.slice(i, i + tamanoGrupo));
    }
    return grupos;
  }

  agregarAlCarrito(producto: Producto): void {
    this.cartService.addToCart({
      id: producto.id.toString(),
      name: producto.nombre,
      price: producto.precio,
      imageUrl: producto.imagen,
      quantity: 1
    });
  }
}
