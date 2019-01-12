import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  email = 'admin@admin.com';
  password = 'admin';
  isLoggedIn = false;

  constructor() { }
}
