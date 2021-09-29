import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../models/models";
import {ApiService} from "../../../../_services/api.service";
import {SweatService} from "../../../../_services/sweat";

@Component({
  selector: 'app-edit-product-model',
  templateUrl: './edit-product-model.component.html',
  styleUrls: ['./edit-product-model.component.scss']
})
export class EditProductModelComponent implements OnInit {
  @Input() singleProductEdit: Product = new Product(0, '', 0, 'image/jpeg', '', 0);

  constructor(private apiService: ApiService, private sweatService: SweatService) {
  }

  ngOnInit(): void {
    this.singleProductEdit.filename = '';
    console.log('ngOnInit', this.singleProductEdit);

  }

  async submitProductChanges() {
    await this.apiService.createPostService('/products/editProduct', this.singleProductEdit);
    await this.sweatService.Success(
      'Product updated successfully!',
      '',
      'success');
  }

  select($event: any) {
    if ($event.target.select)
      $event.target.select();
    else if ($event.target.children[0].select)
      $event.target.children[0].select();
  }
}
