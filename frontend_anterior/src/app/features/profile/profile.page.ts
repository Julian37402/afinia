import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { finalize, forkJoin } from 'rxjs';

import { DiscoveryPreferences, Gender, OwnProfile, RelationshipGoal, UserBrief } from '../../core/models/afinia.models';
import { AccountService } from '../../core/services/account.service';
import { ProfileService } from '../../core/services/profile.service';
import { genderLabel, goalLabel } from '../../core/utils/labels';
import { primaryPhotoUrl } from '../../core/utils/photos';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage {
  own: OwnProfile | null = null;
  prefs: DiscoveryPreferences | null = null;
  user: UserBrief | null = null;
  loading = true;
  error = false;

  constructor(
    private profileService: ProfileService,
    private account: AccountService,
    private navCtrl: NavController
  ) {}

  /** Se recarga al entrar a la pestaña para reflejar cambios recientes. */
  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.error = false;
    forkJoin({
      own: this.profileService.getOwnProfile(),
      prefs: this.profileService.getDiscoveryPreferences(),
      user: this.account.getMe(),
    }).subscribe({
      next: ({ own, prefs, user }) => {
        this.own = own;
        this.prefs = prefs;
        this.user = user;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  retry() {
    this.loading = true;
    this.load();
  }

  /** Cierra sesión (POST /api/v1/auth/logout) y vuelve al login aunque la llamada falle. */
  logout() {
    this.account
      .logout()
      .pipe(finalize(() => this.navCtrl.navigateRoot('/login')))
      .subscribe({ error: () => undefined });
  }

  photo(profile: OwnProfile): string | null {
    return primaryPhotoUrl(profile.photos);
  }

  gender(gender: Gender): string {
    return genderLabel(gender);
  }

  goal(goal: RelationshipGoal | null | undefined): string {
    return goalLabel(goal);
  }
}
