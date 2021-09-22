import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../models/models";
import {CategoriesService} from "../../../../_services/categories.service";

@Component({
  selector: 'app-add-product-model',
  templateUrl: './add-product-model.component.html',
  styleUrls: ['./add-product-model.component.scss']
})
export class AddProductModelComponent implements OnInit {
  @Input() singleProduct: Product = new Product(0, '', 0, 0, '');


  constructor(public categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categoriesService.getCategories();
  }

  submitNewProduct() {
    console.log(this.singleProduct);
    this.singleProduct = new Product(0, '', 0, 0, '');
  }

  handleSelectedCategory($event: any) {
    console.log($event.target.value);
    this.singleProduct.category_id = Number($event.target.value);
  }

  select($event: any) {
    if ($event.target.select)
      $event.target.select();
    else if ($event.target.children[0].select)
      $event.target.children[0].select();
  }
}
