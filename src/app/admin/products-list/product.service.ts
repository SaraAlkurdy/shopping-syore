import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  constructor() {}

  public getProductsData() {
    return this._http.get(this.baseUrl + 'products');
  }

  public addProduct(params: any) {
    return this._http.post(this.baseUrl + 'products', params);
  }

  public deleteProduct(id: number) {
    return this._http.delete(this.baseUrl + 'products/' + id);
  }

  public productDetails(id: number) {
    return this._http.get(this.baseUrl + 'products/' + id);
  }

  public updateProduct(params: any) {
    return this._http.put(this.baseUrl + 'products/' + params.id, params);
  }
}
