import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shopping-store';
  _authService = inject(AuthenticationService);
  _router = inject(Router);

  ngOnInit() {
    this._authService.autoAuth();
  }
}
