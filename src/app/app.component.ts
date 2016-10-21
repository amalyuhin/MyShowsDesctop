import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable }        from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  loginForm: FormGroup;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: '',
      password: ''
    });
  }

  onSubmit() {
      let data = this.loginForm.value;
      this.authService
        .login(data.login, data.password)
        .subscribe(
          (res) => {
            console.log('Auth result:', res);
          },
          (err) => {
            console.log('Auth error:', err);
          }
        )

  }
}
