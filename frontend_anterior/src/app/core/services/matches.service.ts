import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { mockDb } from '../mocks/afinia.mocks';
import { ApiPage, ApiResponse, Match } from '../models/afinia.models';
import { apiUrl, clone } from '../utils/api-url';

/** Coincidencias del usuario autenticado. */
@Injectable({ providedIn: 'root' })
export class MatchesService {
  private readonly http = inject(HttpClient);

  /** GET /api/v1/match/my-matches */
  getMyMatches(): Observable<Match[]> {
    if (environment.useMocks) {
      return of(clone(mockDb.matches)).pipe(delay(350));
    }
    return this.http
      .get<ApiPage<Match>>(apiUrl('/api/v1/match/my-matches'))
      .pipe(map((res) => res.data.items));
  }

  /** GET /api/v1/match/{matchId} */
  getMatch(matchId: string): Observable<Match> {
    if (environment.useMocks) {
      const found = mockDb.matches.find((m) => m.id === matchId);
      return found
        ? of(clone(found)).pipe(delay(150))
        : throwError(() => new Error('NOT_FOUND'));
    }
    return this.http
      .get<ApiResponse<Match>>(apiUrl(`/api/v1/match/${encodeURIComponent(matchId)}`))
      .pipe(map((res) => res.data));
  }
}
