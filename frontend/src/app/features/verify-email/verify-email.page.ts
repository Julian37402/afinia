import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStateService } from '../../core/user-state.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
  standalone: false,
})
export class VerifyEmailPage implements OnDestroy {
  token = '';
  cooldown = 0;
  resent = false;
  private timer?: ReturnType<typeof setInterval>;

  constructor(private router: Router, route: ActivatedRoute, public user: UserStateService) {
    this.token = route.snapshot.queryParamMap.get('token') ?? '';
  }

  get email(): string { return this.user.profile.email || 'tu correo'; }

  onVerify() {
    if (!this.token.trim()) return;
    // TODO: POST /api/v1/auth/verify-email con { token }
    this.router.navigate(['/onboarding']);
  }

  resend() {
    if (this.cooldown > 0) return;
    // TODO: POST /api/v1/auth/resend-verification
    this.resent = true;
    this.cooldown = 30;
    this.timer = setInterval(() => { if (--this.cooldown <= 0) clearInterval(this.timer); }, 1000);
  }

  ngOnDestroy() { clearInterval(this.timer); }
}
