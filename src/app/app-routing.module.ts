import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { RolesGuard } from './authentication/roles.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((a) => a.AdminModule),
    canActivate: [AuthGuard, RolesGuard],
    data: { role: 'admin' },
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((a) => a.UserModule),
    canActivate: [AuthGuard, RolesGuard],
    data: { role: 'user' },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./authentication/authentication.component').then(
        (a) => a.AuthenticationComponent
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
