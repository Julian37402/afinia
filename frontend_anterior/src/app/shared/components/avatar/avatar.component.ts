import { Component, Input } from '@angular/core';

const GRADIENTS: ReadonlyArray<readonly [string, string]> = [
  ['#e0d6f7', '#c9baf0'],
  ['#fad9de', '#f3b4be'],
  ['#eee8fb', '#ad98e8'],
  ['#fdeef0', '#e0d6f7'],
  ['#c9baf0', '#fad9de'],
];

/** Foto de perfil o, si no hay, iniciales sobre un degradado suave determinado por el nombre. */
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: false,
})
export class AvatarComponent {
  @Input() name = '';
  @Input() src: string | null | undefined = null;
  /** Lado en píxeles (se ignora con `fill`). */
  @Input() size = 48;
  /** Ocupa todo el contenedor padre (para la tarjeta grande de perfil). */
  @Input() fill = false;

  get initials(): string {
    const parts = this.name.trim().split(/\s+/).filter((p) => p.length > 0);
    if (parts.length === 0) {
      return '?';
    }
    const first = parts[0].charAt(0);
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
    return (first + last).toUpperCase();
  }

  get background(): string {
    let hash = 0;
    for (let i = 0; i < this.name.length; i++) {
      hash = (hash + this.name.charCodeAt(i)) % GRADIENTS.length;
    }
    const [from, to] = GRADIENTS[hash];
    return `linear-gradient(145deg, ${from}, ${to})`;
  }
}
