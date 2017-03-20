import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { MainComponent } from './main.component';
import { NewEpisodesComponent } from './new-episodes/new-episodes.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: NewEpisodesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
