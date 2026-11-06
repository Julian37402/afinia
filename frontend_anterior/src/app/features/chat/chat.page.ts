import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { forkJoin } from 'rxjs';

import { Match, Message } from '../../core/models/afinia.models';
import { ChatService } from '../../core/services/chat.service';
import { MatchesService } from '../../core/services/matches.service';
import { goalLabel } from '../../core/utils/labels';
import { primaryPhotoUrl } from '../../core/utils/photos';

/** Longitud máxima de un mensaje según el contrato (POST /match/{matchId}/messages). */
const MAX_MESSAGE_LENGTH = 2000;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false,
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content?: IonContent;

  readonly maxLength = MAX_MESSAGE_LENGTH;
  /** Sugerencias para romper el hielo cuando todavía no hay mensajes. */
  readonly icebreakers: string[] = [
    '¡Hola! ¿Cómo va tu día?',
    'Vi que tenemos gustos en común. ¿Qué te gusta hacer en tu tiempo libre?',
  ];

  matchId = '';
  match: Match | null = null;
  messages: Message[] = [];
  draft = '';
  loading = true;
  error = false;
  sending = false;
  sendError = false;

  constructor(
    private route: ActivatedRoute,
    private matchesService: MatchesService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.matchId = this.route.snapshot.paramMap.get('matchId') ?? '';
    this.load();
  }

  load() {
    this.loading = true;
    this.error = false;
    forkJoin({
      match: this.matchesService.getMatch(this.matchId),
      messages: this.chatService.listMessages(this.matchId),
    }).subscribe({
      next: ({ match, messages }) => {
        this.match = match;
        this.messages = messages;
        this.loading = false;
        this.scrollToBottom(0);
        // Marca la conversación como leída; si falla no se interrumpe la lectura.
        this.chatService.markRead(this.matchId).subscribe({ error: () => undefined });
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  send() {
    const text = this.draft.trim();
    if (!text || this.sending) {
      return;
    }
    this.sending = true;
    this.sendError = false;
    this.chatService.sendMessage(this.matchId, text).subscribe({
      next: (message) => {
        this.messages = [...this.messages, message];
        this.draft = '';
        this.sending = false;
        this.scrollToBottom();
      },
      error: () => {
        this.sending = false;
        this.sendError = true;
      },
    });
  }

  useIcebreaker(text: string) {
    this.draft = text;
  }

  /** Un mensaje es mío si su remitente no es la otra persona del match. */
  isMine(message: Message): boolean {
    return !!this.match && message.sender_user_id !== this.match.other_user.user_id;
  }

  get photo(): string | null {
    return this.match ? primaryPhotoUrl(this.match.other_user.photos) : null;
  }

  get subtitle(): string {
    if (!this.match) {
      return '';
    }
    const goal = goalLabel(this.match.other_user.relationship_goal);
    const city = this.match.other_user.city ?? '';
    return [city, goal].filter((part) => part.length > 0).join(' · ');
  }

  trackById(_index: number, message: Message): string {
    return message.id;
  }

  private scrollToBottom(duration = 250) {
    setTimeout(() => this.content?.scrollToBottom(duration), 60);
  }
}
