import { Injectable, inject } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, share, map } from 'rxjs';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<boolean> {
  _categoryService = inject(CategoryService);
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._categoryService.getCategoriesData().pipe(
      share()
      );
  }
}
