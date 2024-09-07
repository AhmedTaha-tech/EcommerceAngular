import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-product-card',
  templateUrl: './single-product-card.component.html',
  styleUrl: './single-product-card.component.css'
})
export class SingleProductCardComponent implements OnInit {
  @Input() data: any;
  className1 = "";
  className2 = "";
  id = "";
ngOnInit(): void {

    if (this.data.CurrentPageName == "GetProductByCategory")
    {
        this.id = "ProducSec-" + this.data.id;
    }
    else if (this.data.CurrentPageName == "FavouriteProducts")
    {
        this.className1 = "col-lg-3 mt-4";
        this.className2 = "common-slider-card-wrapper";
        this.id = "div_" + this.data.id;
    }
    else if (this.data.CurrentPageName == "Index" || this.data.CurrentPageName == "SimilarProducts")
    {
      this.className1 = "";
      this.className2 = "item";
      this.id = "";
    }
    var priceAfterDiscount = (this.data.price - this.data.priceDisc);

    var appearSendOffer = false;
    var diffOfDates = 0.0;
}
}
