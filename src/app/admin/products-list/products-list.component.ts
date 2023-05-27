import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from './product.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ProductsFormComponent } from '../products-form/products-form.component';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  private _productService = inject(ProductService);
  _activeRoute = inject(ActivatedRoute);
  categories$: Observable<any> | null = null;
  dataSource: any;

  totalRecords: number = 0;
  pageSize: number = 5;

  spinner: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProductList();
    this.categories$ = this._activeRoute.data.pipe(
      map((s: any) => s?.categories)
    );
  }

  getProductList() {
    this.spinner = true;
    this._productService.getProductsData().subscribe((result) => {
      this.spinner = false;
      this.dataSource = result;
      this.totalRecords = this.dataSource?.length;
      this.dataSource.paginator = this.paginator;
    });
  }

  onAddProduct() {
    const dialogRef = this.dialog.open(ProductsFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Add Product',
        categories$: this.categories$,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) this.getProductList();
    });
  }

  onUpdateProduct(id: number) {
    const dialogRef = this.dialog.open(ProductsFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Update Product',
        productId: id,
        categories$: this.categories$,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) this.getProductList();
    });
  }

  onDeleteProduct(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Delete Product',
        message: 'Are you sure you want to delete this product?',
        productId: id,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.spinner = true;
        this._productService.deleteProduct(id).subscribe((result) => {
          this.spinner = false;
          this.dataSource.filter((item: any) => item.id !== id);
        });
      }
    });
  }
}
