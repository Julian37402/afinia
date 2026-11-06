import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./features/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./features/onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./features/auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    // Pestañas: /app/dashboard (Descubrir), /app/matches y /app/profile
    path: 'app',
    loadChildren: () => import('./features/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    // Ruta anterior: se conserva y redirige a la pestaña Descubrir
    path: 'dashboard',
    redirectTo: 'app/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'chat/:matchId',
    loadChildren: () => import('./features/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
