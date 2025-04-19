import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule],
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponent {
  products = [
    { id: 91, name: 'Camara', price: 250 },
    { id: 2, name: 'Computadora', price: 400 },
    { id: 3, name: 'Celular', price: 600 },
    { id: 4, name: 'Reloj', price: 350 }
  ].map(p => ({ ...p, image: `https://picsum.photos/id/${p.id}/900/500` }));
}
