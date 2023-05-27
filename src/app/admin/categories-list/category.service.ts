import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  constructor() {}

  public getCategoriesData() {
    return this._http.get(this.baseUrl + 'products/categories');
  }

  public getCategoryProducts(category: string) {
    return this._http.get(this.baseUrl + 'products/category/' + category);
  }
}
