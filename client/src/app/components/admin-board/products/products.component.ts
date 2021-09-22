import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../../_services/products.service";
import {CategoriesService} from "../../../_services/categories.service";
import {Product} from "../../../models/models";
import {ApiService} from "../../../_services/api.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  singleProductEdit: Product = new Product(0, '', 0, 0, '');

  constructor(public productsService: ProductsService, public categoriesService: CategoriesService, private apiService: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    await this.productsService.getAllProducts();
    await this.categoriesService.getCategories();
  }

  async handleProductDelete(id: number) {
    console.log(id);
    await this.apiService.createPostService('/products/deleteProduct', {id: id});
    await this.productsService.getAllProducts();
  }

  handleProductEdit(product: Product) {
    this.singleProductEdit = product;
    // console.log(this.singleProduct);
  }

  handleSelectedCategory($event: any) {
    // console.log($event.target.value);
    this.productsService.getProductsByCategoryId(Number($event.target.value));
  }
}
