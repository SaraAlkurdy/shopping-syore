import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Product, ProductService } from '../products-list/product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
  @Input() title: string = '';

  private productService = inject(ProductService);

  productsForm: FormGroup = new FormGroup({});
  _dialogRef = inject(MatDialogRef<ProductsFormComponent>);
  _formBuilder = inject(FormBuilder);
  categories$: Observable<any> | null = null;
  submitted: boolean = false;
  fileName = '';
  imageUrl: any;
  selectedFile: any = null;
  spinner: boolean = false;
  productId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductsFormComponent) {}

  ngOnInit(): void {
    this.title = this.data?.title;
    this.productId = this.data?.productId;
    this.categories$ = this.data?.categories$;

    if (this.productId) {
      this.getProductDetails(this.productId);
    }

    this.productsForm = this._formBuilder.group({
      id: [],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required]],
      rating: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,1})?$')],
      ],
      category: ['', [Validators.required]],
    });
  }

  get f() {
    return this.productsForm.controls;
  }

  getProductDetails(id: number) {
    this.spinner = true;
    this.productService.productDetails(id).subscribe((result: any) => {
      this.spinner = false;
      this.imageUrl = result?.image;
      this.productsForm.patchValue({
        id: result?.id,
        title: result?.title,
        price: result?.price,
        description: result?.description,
        category: result?.category,
        image: result?.image,
        rating: result?.rating?.rate,
      });
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      let reader = new FileReader();

      if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append('thumbnail', file);

        reader.onloadend = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);

        this.productsForm.controls['image'].setValue(file);
      }
    }
  }

  submit() {
    this.submitted = true;
    this.spinner = true;
    if (this.productsForm.invalid) {
      this.spinner = false;
      return;
    }
    const data: Product = this.productsForm?.value;
    if (!this.productId) {
      this.productService.addProduct(data).subscribe((result) => {
        this.spinner = false;
        this._dialogRef.close();
      });
    } else {
      this.productService.updateProduct(data).subscribe((result) => {
        this.spinner = false;
        this._dialogRef.close();
      });
    }
  }
}
