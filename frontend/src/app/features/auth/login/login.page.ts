import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../../../core/user-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';
  showPassword = false;
  loading = false;

  constructor(private router: Router, private user: UserStateService) { }

  get valid(): boolean { return /^\S+@\S+\.\S+$/.test(this.email) && this.password.length > 0; }

  onLogin() {
    if (!this.valid || this.loading) return;
    // TODO: Integrar con backend endpoint /api/v1/auth/login
    console.log('Login attempt', this.email);
    this.user.profile.email = this.user.profile.email || this.email;
    this.loading = true;
    // Simular éxito y redirigir
    setTimeout(() => { this.loading = false; this.router.navigate(['/dashboard']); }, 450);
  }
}
