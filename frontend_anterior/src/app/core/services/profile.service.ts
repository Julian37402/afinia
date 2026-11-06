import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MOCK_OWN_PROFILE, MOCK_PREFERENCES } from '../mocks/afinia.mocks';
import { ApiResponse, DiscoveryPreferences, OwnProfile } from '../models/afinia.models';
import { apiUrl, clone } from '../utils/api-url';

/** Perfil propio y preferencias de búsqueda. */
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);

  /** GET /api/v1/profile/ */
  getOwnProfile(): Observable<OwnProfile> {
    if (environment.useMocks) {
      return of(clone(MOCK_OWN_PROFILE)).pipe(delay(300));
    }
    return this.http.get<ApiResponse<OwnProfile>>(apiUrl('/api/v1/profile/')).pipe(map((res) => res.data));
  }

  /** GET /api/v1/profile/discovery-preferences */
  getDiscoveryPreferences(): Observable<DiscoveryPreferences> {
    if (environment.useMocks) {
      return of(clone(MOCK_PREFERENCES)).pipe(delay(300));
    }
    return this.http
      .get<ApiResponse<DiscoveryPreferences>>(apiUrl('/api/v1/profile/discovery-preferences'))
      .pipe(map((res) => res.data));
  }
}
