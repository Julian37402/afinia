import { Component, Input } from '@angular/core';

/**
 * Logotipo de AFINIA: dos círculos que se solapan (afinidad = intersección).
 * Lila + rojo, con la zona común en lila profundo.
 */
@Component({
  selector: 'app-brand-logo',
  templateUrl: './brand-logo.component.html',
  styleUrls: ['./brand-logo.component.scss'],
  standalone: false,
})
export class BrandLogoComponent {
  /** Alto del símbolo en píxeles. */
  @Input() size = 36;
  /** Muestra el nombre «afinia» junto al símbolo. */
  @Input() wordmark = true;
}
