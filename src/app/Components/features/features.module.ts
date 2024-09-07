import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule,FeaturesRoutingModule,SharedmoduleModule ],
})
export class FeaturesModule { }
