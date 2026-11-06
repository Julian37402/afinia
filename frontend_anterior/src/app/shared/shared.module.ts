import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AffinityMeterComponent } from './components/affinity-meter/affinity-meter.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { BrandLogoComponent } from './components/brand-logo/brand-logo.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';

const COMPONENTS = [BrandLogoComponent, AffinityMeterComponent, AvatarComponent, EmptyStateComponent];

/** Piezas visuales reutilizables de AFINIA. Importar en cada módulo de página que las use. */
@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class SharedModule {}
