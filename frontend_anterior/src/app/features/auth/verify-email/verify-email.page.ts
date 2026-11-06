import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../core/services/account.service';

type ResendStatus = 'idle' | 'sending' | 'sent' | 'error';

/** Segundos de espera entre reenvíos (evita pulsar varias veces seguidas; el backend aplica su propio límite). */
const RESEND_COOLDOWN_SECONDS = 30;

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
  standalone: false,
})
export class VerifyEmailPage implements OnDestroy {
  /** Correo al que se envió el enlace (llega desde el registro; vacío si se abre la pantalla directamente). */
  email = '';
  status: ResendStatus = 'idle';
  cooldown = 0;

  private timerId: ReturnType<typeof setInterval> | null = null;

  constructor(
    private router: Router,
    private account: AccountService
  ) {
    const navState = this.router.getCurrentNavigation()?.extras.state as { email?: string } | undefined;
    const historyState = history.state as { email?: string } | null;
    this.email = navState?.email ?? historyState?.email ?? '';
  }

  /** Reenvía el correo de verificación · POST /api/v1/auth/resend-verification */
  resend() {
    if (this.status === 'sending' || this.cooldown > 0) {
      return;
    }
    this.status = 'sending';
    this.account.resendVerification().subscribe({
      next: () => {
        this.status = 'sent';
        this.startCooldown();
      },
      error: () => {
        this.status = 'error';
      },
    });
  }

  /** Continúa con la configuración del perfil. */
  continue() {
    this.router.navigate(['/onboarding']);
  }

  /** Vuelve al registro para corregir el correo. */
  changeEmail() {
    this.router.navigate(['/register']);
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  private startCooldown() {
    this.clearTimer();
    this.cooldown = RESEND_COOLDOWN_SECONDS;
    this.timerId = setInterval(() => {
      this.cooldown--;
      if (this.cooldown <= 0) {
        this.clearTimer();
      }
    }, 1000);
  }

  private clearTimer() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
