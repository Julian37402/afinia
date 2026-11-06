import { Component } from '@angular/core';

import { Match, PublicProfile } from '../../core/models/afinia.models';
import { MatchesService } from '../../core/services/matches.service';
import { primaryPhotoUrl } from '../../core/utils/photos';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
  standalone: false,
})
export class MatchesPage {
  /** Matches sin mensajes todavía (para «Nuevos matches»). */
  fresh: Match[] = [];
  /** Matches con conversación iniciada, del más reciente al más antiguo. */
  conversations: Match[] = [];
  loading = true;
  error = false;

  constructor(private matchesService: MatchesService) {}

  /** Se recarga cada vez que se entra a la pestaña (p. ej. al volver de un chat). */
  ionViewWillEnter() {
    this.load();
  }

  get isEmpty(): boolean {
    return this.fresh.length === 0 && this.conversations.length === 0;
  }

  load(onDone?: () => void) {
    this.error = false;
    this.matchesService.getMyMatches().subscribe({
      next: (matches) => {
        this.fresh = matches.filter((m) => !m.last_message);
        this.conversations = matches
          .filter((m) => !!m.last_message)
          .sort((a, b) => (b.last_message?.sent_at ?? '').localeCompare(a.last_message?.sent_at ?? ''));
        this.loading = false;
        onDone?.();
      },
      error: () => {
        this.loading = false;
        this.error = true;
        onDone?.();
      },
    });
  }

  retry() {
    this.loading = true;
    this.load();
  }

  refresh(event: CustomEvent) {
    const refresher = event.target as unknown as { complete(): void };
    this.load(() => refresher.complete());
  }

  photo(profile: PublicProfile): string | null {
    return primaryPhotoUrl(profile.photos);
  }

  /** El último mensaje es mío si su remitente no es la otra persona del match. */
  isMine(match: Match): boolean {
    return !!match.last_message && match.last_message.sender_user_id !== match.other_user.user_id;
  }

  trackById(_index: number, match: Match): string {
    return match.id;
  }
}
