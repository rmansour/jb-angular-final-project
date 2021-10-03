import {Component, Input, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {CategoriesService} from '../../../../_services/categories.service';
import {ProductsService} from '../../../../_services/products.service';
import {SweatService} from '../../../../_services/sweat';
import {Product} from '../../../../models/models';

@Component({
  selector: 'app-add-product-model',
  templateUrl: './add-product-model.component.html',
  styleUrls: ['./add-product-model.component.scss']
})
export class AddProductModelComponent implements OnInit {
  @Input() singleProduct: Product = new Product(0, '', 0, 'image', '', 0);

  formData: FormData = new FormData();
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';


  constructor(public categoriesService: CategoriesService, private productsService: ProductsService, private sweatService: SweatService) {
  }

  ngOnInit(): void {
    this.categoriesService.getCategories();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  async submitNewProduct() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.formData.append('fileUpld', file);
        this.formData.append('type', file.type);
        this.formData.append('filename', file.name);
        //@ts-ignore
        this.formData.append('id', this.singleProduct.id);
        this.formData.append('product_name', this.singleProduct.product_name);
        //@ts-ignore
        this.formData.append('category_id', this.singleProduct.category_id);
        //@ts-ignore
        this.formData.append('price', this.singleProduct.price);
        if (this.formData) {
          this.upsertProduct(this.formData);
        }
      }
    } else {
      if (this.singleProduct.filename === '') {
        this.upsertProduct(this.singleProduct);
        
      }
    }
  }

  async upsertProduct(obj: any) {
    await this.productsService.upsertProduct(obj).then(() => {
      this.sweatService.Success(
        'Product updated successfully!',
        '',
        'success');

      this.formData = new FormData();
      this.singleProduct = new Product(0, '', 0, 'image', '', 0);
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


  handleSelectedCategory($event: any) {
    this.singleProduct.category_id = Number($event.target.value);
  }

  select($event: any) {
    if ($event.target.select)
      $event.target.select();
    else if ($event.target.children[0].select)
      $event.target.children[0].select();
  }
}
