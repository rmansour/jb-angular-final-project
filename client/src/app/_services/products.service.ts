import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Product} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  allProducts: Array<Product> = [];
  productsByCategoryId: Array<Product> = [];
  allProductsSelection: number = 0;

  constructor(private api: ApiService) {
  }

  getProductsByCategoryId(id: number) {
    console.log(id);
    let tmpArr = [...this.allProducts];

    if (isNaN(id)) {
      this.productsByCategoryId = tmpArr;
      return;
    }

    if (this.allProductsSelection === id) {
      this.productsByCategoryId = tmpArr;
      return;
    }
    if (!isNaN(id) || id !== 0 || id !== null) {
      this.productsByCategoryId = tmpArr.filter(product => product.category_id === id);
    } else
      this.productsByCategoryId = tmpArr;

    console.log(this.productsByCategoryId);
  }

  async getAllProducts() {
    this.allProducts = await this.api.createGetService('/products/getProducts') as Array<Product>;
    this.productsByCategoryId = [...this.allProducts];
    console.log(this.allProducts);
  }
}
