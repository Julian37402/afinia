import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../shared/shared.module';
import { VerifyEmailPageRoutingModule } from './verify-email-routing.module';
import { VerifyEmailPage } from './verify-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    VerifyEmailPageRoutingModule
  ],
  declarations: [VerifyEmailPage]
})
export class VerifyEmailPageModule {}
