import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';
import { MatchesPageRoutingModule } from './matches-routing.module';
import { MatchesPage } from './matches.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    MatchesPageRoutingModule
  ],
  declarations: [MatchesPage]
})
export class MatchesPageModule {}
