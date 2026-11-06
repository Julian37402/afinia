import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MOCK_ME_ID, mockDb } from '../mocks/afinia.mocks';
import { ApiPage, ApiResponse, Message, UnreadResult } from '../models/afinia.models';
import { apiUrl, clone } from '../utils/api-url';

/** Mensajería de un match (sin WebSockets en el MVP: se consulta al abrir o actualizar). */
@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);

  /** GET /api/v1/match/{matchId}/messages */
  listMessages(matchId: string): Observable<Message[]> {
    if (environment.useMocks) {
      return of(clone(mockDb.messages[matchId] ?? [])).pipe(delay(250));
    }
    return this.http
      .get<ApiPage<Message>>(apiUrl(`/api/v1/match/${encodeURIComponent(matchId)}/messages`))
      .pipe(map((res) => res.data.items));
  }

  /**
   * POST /api/v1/match/{matchId}/messages · cuerpo: { text } (1–2000 caracteres).
   * El remitente lo decide el servidor según el token; nunca se envía en el cuerpo.
   */
  sendMessage(matchId: string, text: string): Observable<Message> {
    if (environment.useMocks) {
      const message: Message = {
        id: `mock-${Date.now()}`,
        match_id: matchId,
        sender_user_id: MOCK_ME_ID,
        text,
        sent_at: new Date().toISOString(),
        read_at: null
      };
      const list = mockDb.messages[matchId] ?? (mockDb.messages[matchId] = []);
      list.push(message);
      const match = mockDb.matches.find((m) => m.id === matchId);
      if (match) {
        match.last_message = message;
      }
      return of(clone(message)).pipe(delay(150));
    }
    return this.http
      .post<ApiResponse<Message>>(apiUrl(`/api/v1/match/${encodeURIComponent(matchId)}/messages`), { text })
      .pipe(map((res) => res.data));
  }

  /** POST /api/v1/match/{matchId}/read */
  markRead(matchId: string): Observable<UnreadResult> {
    if (environment.useMocks) {
      const match = mockDb.matches.find((m) => m.id === matchId);
      if (match) {
        match.unread_count = 0;
      }
      return of({ unread_count: 0 });
    }
    return this.http
      .post<ApiResponse<UnreadResult>>(apiUrl(`/api/v1/match/${encodeURIComponent(matchId)}/read`), {})
      .pipe(map((res) => res.data));
  }
}
