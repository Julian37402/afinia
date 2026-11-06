import { Component, Input } from '@angular/core';

/** Estado vacío / error: icono, mensaje que orienta y espacio para la acción (ng-content). */
@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: false,
})
export class EmptyStateComponent {
  @Input() icon = 'compass-outline';
  @Input() heading = '';
  @Input() text = '';
}
