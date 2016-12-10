import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './shared/services/api.service';
import { AppToolbarService } from './shared/services/appToolbar.service';
import { DataService } from './shared/services/data.service';
import { LayoutDirective } from './shared/directives/layout.directive';
import { FlexDirective } from './shared/directives/flex.directive';

enableProdMode();


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing,
    MaterialModule.forRoot()
  ],
  providers: [ApiService, AppToolbarService, DataService],
  declarations: [AppComponent, FlexDirective, LayoutDirective, MainComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
