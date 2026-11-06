import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../../../core/user-state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  acceptTerms = false;
  showPassword = false;

  constructor(private router: Router, private user: UserStateService) { }

  get emailOk(): boolean { return /^\S+@\S+\.\S+$/.test(this.email); }
  get checks() {
    return [
      { ok: this.password.length >= 8, label: '8 caracteres' },
      { ok: /[A-Z]/.test(this.password) && /[a-z]/.test(this.password), label: 'Mayúscula y minúscula' },
      { ok: /\d/.test(this.password), label: 'Un número' },
    ];
  }
  get strength(): number { return this.checks.filter(c => c.ok).length; }
  get valid(): boolean { return !!this.name.trim() && this.emailOk && this.strength === 3 && this.acceptTerms; }

  onRegister() {
    if (!this.valid) return;
    console.log('Register attempt', this.name, this.email);
    // TODO: integracion con backend /api/v1/auth/register (requiere accept_terms_version y accept_privacy_version)
    this.user.profile.first_name = this.name.trim().split(' ')[0];
    this.user.profile.email = this.email;
    this.user.save();
    this.router.navigate(['/verify-email']);
  }
}
