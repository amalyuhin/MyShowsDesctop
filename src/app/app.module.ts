import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, RequestOptions, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import { HttpService } from './shared/services/http.service';
import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { NewEpisodesListComponent } from './new-episodes-list/new-episodes-list.component';
import { NewEpisodesItemComponent } from './new-episodes-list/new-episodes-item/new-episodes-item.component';
import { ShowInfoComponent } from './show-info/show-info.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ApiService } from './shared/services/api.service';
import { BaseApiService } from './shared/services/base-api.service';
import { AppToolbarService } from './shared/services/appToolbar.service';
import { DataService } from './shared/services/data.service';
// import { LayoutDirective } from './shared/directives/layout.directive';
// import { FlexDirective } from './shared/directives/flex.directive';

enableProdMode();

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    FlexLayoutModule,
    MaterialModule.forRoot(),
    routing
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: (backend: XHRBackend, options: RequestOptions, router: Router) => {
        return new HttpService(backend, options, router);
      },
      deps: [XHRBackend, RequestOptions, Router]
    },
    AuthGuard,
    ApiService,
    // BaseApiService,
    AppToolbarService,
    DataService
  ],
  declarations: [AppComponent, MainComponent, NewEpisodesListComponent, NewEpisodesItemComponent, LoginComponent, ShowInfoComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
