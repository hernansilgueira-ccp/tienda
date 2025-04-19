import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponentComponent } from "./header-component/header-component.component";
import { MainComponent } from "./main-component/main-component.component";
import { ProductListComponent} from "./product-list-component/product-list-component.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NgbCarouselModule, HeaderComponentComponent, MainComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tienda';
}
