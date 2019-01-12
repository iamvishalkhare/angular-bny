import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../../services/credentials.service';
import { ConstantsService } from '../../services/constants.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  showMsgDiv: boolean;
  messageForDiv: boolean;
  loginForm: FormGroup;

  constructor(
    private credentials: CredentialsService,
    private constants: ConstantsService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.credentials.isLoggedIn = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }
  submitCredentials() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (email === undefined || email.length === 0 || password === undefined || password.length === 0) {
      this.showMessageinDiv(this.constants.ALL_FIELDS_MANDATORY);
    } else {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this.showMessageinDiv('');
        if (this.credentials.email === email && this.credentials.password === password) {
          this.credentials.isLoggedIn = true;
          this.router.navigate(['dashboard']);
        } else {
          this.showMessageinDiv(this.constants.WRONG_CREDENTIALS);
        }
      } else {
        this.showMessageinDiv(this.constants.INVALID_EMAIL);
      }
    }
  }

  showMessageinDiv(msg: any): void {
    this.showMsgDiv = true;
    this.messageForDiv = msg;
  }

}
