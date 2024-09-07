import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleProductCardComponent } from './single-product-card/single-product-card.component';


@NgModule({
  declarations: [HeaderComponent,FooterComponent,SingleProductCardComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [HeaderComponent,FooterComponent,SingleProductCardComponent]
})
export class SharedmoduleModule { }
