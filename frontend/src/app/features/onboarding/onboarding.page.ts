import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { INTEREST_CATALOG } from '../../core/models';
import { UserStateService } from '../../core/user-state.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: false,
})
export class OnboardingPage {
  currentStep = 1;
  totalSteps = 3;
  steps = ['Sobre ti', 'Intereses', 'Personalidad'];

  genders = ['Masculino', 'Femenino', 'Otro'];
  catalog = INTEREST_CATALOG;
  interests: string[] = [];

  goals = [
    { value: 'Una relación seria y estable', label: 'Relación seria y estable', icon: 'heart' },
    { value: 'Algo casual', label: 'Algo casual', icon: 'sparkles' },
    { value: 'Amistad primero y ver qué pasa', label: 'Amistad primero', icon: 'happy' },
  ];
  scale = [1, 2, 3, 4, 5];

  profile: { first_name: string; gender: string; age: number | null; city: string } = {
    first_name: '',
    gender: '',
    age: null,
    city: ''
  };

  analytics = {
    intro_extro: 3,
    hobbies: 3,
    target: ''
  };

  constructor(private router: Router, private user: UserStateService) {
    this.profile.first_name = user.profile.first_name;
  }

  get canContinue(): boolean {
    if (this.currentStep === 1) return !!this.profile.first_name.trim() && !!this.profile.gender && !!this.profile.age && this.profile.age >= 18 && !!this.profile.city.trim();
    if (this.currentStep === 2) return this.interests.length >= 3;
    return !!this.analytics.target;
  }

  toggleInterest(t: string) {
    this.interests = this.interests.includes(t) ? this.interests.filter(x => x !== t) : [...this.interests, t].slice(0, 8);
  }

  nextStep() {
    if (this.currentStep < this.totalSteps && this.canContinue) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  finishOnboarding() {
    if (!this.canContinue) return;
    // TODO: POST /api/v1/profile y POST /api/v1/analytics/answers
    console.log('Perfil guardado:', this.profile);
    console.log('Analítica guardada:', this.analytics);
    Object.assign(this.user.profile, this.profile, { interests: this.interests });
    Object.assign(this.user.analytics, this.analytics);
    this.user.save();
    this.router.navigate(['/dashboard']);
  }
}
