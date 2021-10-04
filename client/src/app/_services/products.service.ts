import {Injectable} from '@angular/core';
import {Product} from '../models/models';
import {ApiService} from './api.service';
import {CategoriesService} from './categories.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  allProducts: Array<Product> = [];
  productsByCategoryId: Array<Product> = [];
  allProductsSelection: number = 0;
  categoryName: string = '';
  randomPic: unknown = '';

  constructor(private api: ApiService, private categoriesService: CategoriesService) {
  }

  getProductsByCategoryId(id: number) {
    console.log(id);
    this.categoryName = '';
    let tmpArr = [...this.allProducts];

    if (isNaN(id)) {
      this.productsByCategoryId = tmpArr;
      return;
    }

    if (id === 0)
      this.categoryName = 'All Products';

    if (this.allProductsSelection === id) {
      this.productsByCategoryId = tmpArr;
      return;
    }
    if (!isNaN(id) || id !== 0 || id !== null) {
      this.productsByCategoryId = tmpArr.filter(product => product.category_id === id);
    } else
      this.productsByCategoryId = tmpArr;

    // get category name
    this.categoriesService._categories.filter(category => {
      if (id === 0) {
        this.categoryName = 'All Products';
        return;
      }
      if (id === category.id)
        this.categoryName = category.category;
    });

    //console.log(this.categoryName);
  }

  async getRandomProductImage() {
    this.randomPic = await this.api.createGetService('/products/getRandomProductImage');
    console.log(this.randomPic);
  }

  async getAllProducts() {
    this.allProducts = await this.api.createGetService('/products/getProducts') as Array<Product>;
    this.productsByCategoryId = [...this.allProducts];
    console.log(this.allProducts);
  }

  async upsertProduct(product: any) {
    console.log(product);
    await this.api.createPostService('/products/upsertProduct', product);
  }

  searchProducts(searchValue: any) {
    let originalArr = [...this.allProducts];

    if (searchValue.target.value) {
      originalArr = this.allProducts.filter(product =>
        product.product_name.toLowerCase().includes((searchValue.target.value).toLowerCase())
      );
    }

    this.productsByCategoryId = originalArr;
  }
}
