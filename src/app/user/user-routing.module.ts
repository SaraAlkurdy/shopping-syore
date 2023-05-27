import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CategoriesListComponent } from '../admin/categories-list/categories-list.component';
import { CategoryResolver } from '../admin/categories-list/category.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories-list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'categories-list',
        component: CategoriesListComponent,
        resolve: {
          categories: CategoryResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
