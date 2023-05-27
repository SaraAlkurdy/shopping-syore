import { Observable, concatMap, finalize, from, map, tap } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './category.service';
import { ProductService } from '../products-list/product.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  _activeRoute = inject(ActivatedRoute);
  _categoryService = inject(CategoryService);
  _productService = inject(ProductService);

  categories$: Observable<any> | null = null;
  spinner: boolean = false;
  categories: any;
  productsList: any;
  productCategories: any = [];
  displayedColumns: string[] = ['title', 'price', 'rating'];

  constructor() {}

  ngOnInit(): void {
    this.getCategoryProductList();
  }

  getCategoryProductList() {
    this.spinner = true;
    this._activeRoute.data
      .pipe(map((s: any) => s?.categories))
      .subscribe((categories) => {
        this.categories = categories;
        this.categories.map((category: any) =>
          this._categoryService
            .getCategoryProducts(category)
            .subscribe((products: any) => {
              this.spinner = false;
              products.filter((product: any) => product.category == category);
              this.productCategories.push({
                category: category,
                products: products,
              });
            })
        );
      });
  }
}
