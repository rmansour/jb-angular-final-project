import {Injectable} from '@angular/core';
import {Category} from "../models/models";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  _categories: Array<Category> = [];

  constructor(private api: ApiService) {
  }

  async getCategories() {
    this._categories = await this.api.createGetService('/categories/getCategories') as Array<Category>;
    // console.table(this._categories);
  }
}
