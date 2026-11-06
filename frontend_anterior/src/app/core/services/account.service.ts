import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MOCK_USER } from '../mocks/afinia.mocks';
import { ApiResponse, ResendVerificationResult, UserBrief } from '../models/afinia.models';
import { apiUrl, clone } from '../utils/api-url';

/**
 * Cuenta autenticada y verificación de correo.
 * El login y el registro siguen en sus páginas (con TODO) hasta que exista manejo de sesión.
 */
@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly http = inject(HttpClient);

  /** GET /api/v1/auth/me */
  getMe(): Observable<UserBrief> {
    if (environment.useMocks) {
      return of(clone(MOCK_USER)).pipe(delay(200));
    }
    return this.http.get<ApiResponse<UserBrief>>(apiUrl('/api/v1/auth/me')).pipe(map((res) => res.data));
  }

  /** POST /api/v1/auth/resend-verification (202 → { data: { status: 'accepted' } }) */
  resendVerification(): Observable<ResendVerificationResult> {
    if (environment.useMocks) {
      return of<ResendVerificationResult>({ status: 'accepted' }).pipe(delay(500));
    }
    return this.http
      .post<ApiResponse<ResendVerificationResult>>(apiUrl('/api/v1/auth/resend-verification'), {})
      .pipe(map((res) => res.data));
  }

  /** POST /api/v1/auth/logout (204). En modo mock no hace nada. */
  logout(): Observable<void> {
    if (environment.useMocks) {
      return of(undefined).pipe(delay(100));
    }
    return this.http.post<void>(apiUrl('/api/v1/auth/logout'), {});
  }
}
