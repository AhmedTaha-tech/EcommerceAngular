import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SharedmoduleModule } from './Components/sharedmodule/sharedmodule.module';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FeaturesModule } from './Components/features/features.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterOutlet,
    FeaturesModule,
    SharedmoduleModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
})
export class AppModuleModule { }
