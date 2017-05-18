import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { MainComponent } from './main.component';
import { NewEpisodesListComponent } from './new-episodes-list/new-episodes-list.component';
import { ShowInfoComponent } from './show-info/show-info.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: NewEpisodesListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'show/:showId', component: ShowInfoComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
