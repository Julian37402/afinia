import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DemoDataService } from '../../core/demo-data.service';
import { INTEREST_CATALOG } from '../../core/models';
import { UserStateService } from '../../core/user-state.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage {
  editing = false;
  catalog = INTEREST_CATALOG;
  draftBio = '';
  draftInterests: string[] = [];
  readonly goals = [
    'Una relación seria y estable', 'Algo casual', 'Amistad primero y ver qué pasa',
  ];

  constructor(public user: UserStateService, public data: DemoDataService, private router: Router) {}

  get p() { return this.user.profile; }
  get a() { return this.user.analytics; }
  get interests() { return this.p.interests.length ? this.p.interests : ['Viajes', 'Música', 'Naturaleza']; }
  get completion(): number {
    const f = [this.p.first_name, this.p.gender, this.p.age, this.p.city, this.p.bio, this.p.interests.length, this.a.target];
    return Math.round(f.filter(Boolean).length / f.length * 100);
  }
  get affinityMsg(): string { const v = this.data.averageAffinity; return v >= 80 ? 'Tienes un gran perfil en AFINIA' : 'Completa tu perfil para mejorar tus coincidencias'; }

  edit() { this.draftBio = this.p.bio; this.draftInterests = [...this.p.interests]; this.editing = true; }
  cancel() { this.editing = false; }
  save() {
    // TODO: PUT /api/v1/profile/
    this.p.bio = this.draftBio.trim();
    this.p.interests = this.draftInterests;
    this.user.save();
    this.editing = false;
  }
  toggle(t: string) {
    this.draftInterests = this.draftInterests.includes(t) ? this.draftInterests.filter(x => x !== t) : [...this.draftInterests, t].slice(0, 8);
  }
  logout() { this.user.clear(); this.router.navigate(['/login']); }
}
