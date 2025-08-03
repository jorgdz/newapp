import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Product, ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductListComponent  implements OnInit {

  products: Product[] = []

  productsService = inject(ProductsService)

  async ngOnInit() {
    const response = await this.productsService.getAll()
    console.log(response.results)
    this.products = response.results
  }

}
