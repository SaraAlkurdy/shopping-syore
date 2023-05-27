import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  _authService = inject(AuthenticationService);
  constructor() {}

  ngOnInit(): void {}

  onLogout() {
    console.log('logout');

    this._authService.logout();
  }
}
