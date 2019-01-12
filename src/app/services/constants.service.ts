import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  ALL_FIELDS_MANDATORY = 'All fields are mandatory';
  WRONG_CREDENTIALS = 'Wrong E-Mail or Password. Please try again';
  INVALID_EMAIL = 'Please enter a valid E-Mail address';

  constructor() { }
}
