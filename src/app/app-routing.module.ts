import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';

import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { FunctionalitiesComponent } from './components/functionalities/functionalities.component';
import { HomeComponent } from './components/home/home.component';
import { DummyComponent } from './dummy/dummy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'functionalities',
    component: FunctionalitiesComponent,
    // canActivate: [AuthGuard],
  },
  { path: 'benefits', component: BenefitsComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'tenant',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/tenant/tenant.module').then((m) => m.TenantModule),
  },
  {
    path: 'owner',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/owner/owner.module').then((m) => m.OwnerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
