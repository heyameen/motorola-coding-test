import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
      const username = this.loginForm.value.username || '';
      const password = this.loginForm.value.password || '';
    if (this.authService.login(username, password)) {
        console.log('got here')
        this.router.navigate(['/home']);
      } else {
      this.errorMessage = 'Invalid username or password';
      this.loginForm.patchValue({ username: '', password: '' })
    }
  }


}
