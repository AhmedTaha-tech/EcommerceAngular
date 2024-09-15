import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './headercomponents/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleProductCardComponent } from './single-product-card/single-product-card.component';
import { SearchMenuComponent } from './headercomponents/search-menu/search-menu.component';


@NgModule({
  declarations: [HeaderComponent,FooterComponent,SingleProductCardComponent,SearchMenuComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [HeaderComponent,FooterComponent,SingleProductCardComponent]
})
export class SharedmoduleModule { }
