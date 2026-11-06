import { Component, Input } from '@angular/core';

/**
 * Medidor de afinidad: dos círculos cuyo solapamiento crece con el porcentaje.
 * 0 % = círculos casi separados · 100 % = casi superpuestos.
 */
@Component({
  selector: 'app-affinity-meter',
  templateUrl: './affinity-meter.component.html',
  styleUrls: ['./affinity-meter.component.scss'],
  standalone: false,
})
export class AffinityMeterComponent {
  /** Porcentaje 0–100. */
  @Input() value = 0;
  /** Alto del dibujo en píxeles. */
  @Input() size = 40;
  @Input() label = 'Afinidad';

  readonly r = 14;
  readonly pad = 2;
  readonly cy = 16;
  readonly viewHeight = 32;

  private get ratio(): number {
    return Math.min(100, Math.max(0, this.value)) / 100;
  }

  /** Distancia entre centros: 2r cuando no hay afinidad, 0.3r cuando es total. */
  get dist(): number {
    return 2 * this.r * (1 - 0.85 * this.ratio);
  }

  get cx1(): number {
    return this.pad + this.r;
  }

  get cx2(): number {
    return this.cx1 + this.dist;
  }

  get viewWidth(): number {
    return 2 * this.r + this.dist + 2 * this.pad;
  }

  get drawWidth(): number {
    return (this.size * this.viewWidth) / this.viewHeight;
  }

  /** Lente de intersección de ambos círculos. */
  get lens(): string {
    const half = this.dist / 2;
    const x = this.cx1 + half;
    const dy = Math.sqrt(this.r * this.r - half * half);
    const top = this.cy - dy;
    const bottom = this.cy + dy;
    const r = this.r;
    return `M${x} ${top}A${r} ${r} 0 0 1 ${x} ${bottom}A${r} ${r} 0 0 1 ${x} ${top}Z`;
  }
}
