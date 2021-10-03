import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../models/models';
import {ApiService} from '../../../../_services/api.service';
import {SweatService} from '../../../../_services/sweat';
import {ProductsService} from '../../../../_services/products.service';
import {CategoriesService} from '../../../../_services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product-model',
  templateUrl: './edit-product-model.component.html',
  styleUrls: ['./edit-product-model.component.scss']
})
export class EditProductModelComponent implements OnInit {
  @Input() singleProductEdit: Product = new Product(0, '', 0.0, 'image', '', 0);

  formData: FormData = new FormData();
  selectedFiles?: FileList;
  currentFile?: File;

  constructor(private apiService: ApiService, private sweatService: SweatService, private productsService: ProductsService, public categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.formData = new FormData();
    console.log(this.singleProductEdit);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.formData = new FormData();
  }

  handleSelectedCategory($event: any) {
    console.log($event.target.value);
    this.singleProductEdit.category_id = Number($event.target.value);
    console.log(this.singleProductEdit);
  }

  async submitProductChanges() {
    console.log(this.selectedFiles);
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.formData.append('fileUpld', file);
        this.formData.append('type', file.type);
        this.formData.append('filename', file.name);
        //@ts-ignore
        this.formData.append('id', this.singleProductEdit.id);
        this.formData.append('product_name', this.singleProductEdit.product_name);
        //@ts-ignore
        this.formData.append('category_id', this.singleProductEdit.category_id);
        //@ts-ignore
        this.formData.append('price', this.singleProductEdit.price);

        console.log(this.formData);
        if (this.formData) {
          this.upsertProduct(this.formData);
        }
      }
    } else {
      this.upsertProduct(this.singleProductEdit);
    }
  }

  async upsertProduct(objToSubmit: any) {
    await this.productsService.upsertProduct(objToSubmit).then(() => {
      this.sweatService.Success(
        'Product updated successfully!',
        '',
        'success');

      this.formData = new FormData();
      this.singleProductEdit = new Product(0, '', 0, 'image', '', 0);
      this.currentFile = undefined;
      this.selectedFiles = undefined;
      this.productsService.getAllProducts();
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: `Oops...`,
        text: `${err}`
      });
    });
  }

  select($event: any) {
    if ($event.target.select)
      $event.target.select();
    else if ($event.target.children[0].select)
      $event.target.children[0].select();
    console.log($event);
  }
}
