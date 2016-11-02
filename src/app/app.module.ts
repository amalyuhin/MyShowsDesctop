import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './shared/api.service';
import { AppToolbarService } from './shared/appToolbar.service';
import { DataService } from './shared/data.service';

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
  declarations: [AppComponent, MainComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
