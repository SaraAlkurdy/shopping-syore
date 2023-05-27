import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService, User } from './authentication.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, filter, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  _authService = inject(AuthenticationService);
  _formBuilder = inject(FormBuilder);
  _Router = inject(Router);
  loginForm: FormGroup = new FormGroup({});

  submitted: boolean = false;
  showPassword: boolean = true;

  loginObservable$: Observable<any> | null = null;
  constructor() {
    console.log(this._authService.role, this._authService.isAuth);

    const userRole =
      this._authService.role && this._authService.role == 'admin'
        ? '/admin'
        : '/user';
    this._authService.isAuth ? this._Router.navigateByUrl(userRole) : true;
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const data: User = this.loginForm.value;

    this.loginObservable$ = this._authService.login().pipe(
      map((res) => {
        let user = res.find(
          (el) => el.userName == data.userName && el.password == data.password
        );
        return user;
      }),
      tap((user) => {
        console.log('user', user);
        this._authService.isAuth = true;
        this._authService.role = user?.role;
        localStorage.setItem('user', JSON.stringify(user));
        if (user?.role == 'admin') {
          this._Router.navigate(['/admin/products-list']);
        } else {
          this._Router.navigate(['/user/categories-list']);
        }
      })
    );
  }
}
