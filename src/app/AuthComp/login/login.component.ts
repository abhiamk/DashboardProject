import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../API-Service/login.service';
import { FkLoginResponse, LoginResponse } from '../../Interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      expiresInMins: [10]
    });
  }

  get f() {
    return this.loginForm.controls as { [key: string]: any };
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.submitted = false;
      this.loginService.fkLogin(this.loginForm.value).subscribe({
        next: (info: FkLoginResponse) => {
          localStorage.setItem('currentUser', JSON.stringify(info));
          this.router.navigateByUrl('dashboard');
        },
        error(err) {
          alert(err.error.message);
        },
      })
    }
  }

}
