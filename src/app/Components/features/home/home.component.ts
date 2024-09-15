import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeServiceService } from '../../../services/home/home-service.service';
import { CategoriesWithProducts } from '../../../model/home/categories-with-products';
import { environment } from '../../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {
  subscriptions: Subscription[]= [];
  constructor(private headerService: HomeServiceService) { }
  apiHost=environment.apiHost;
  categoriesWithProducts:CategoriesWithProducts[]|undefined;
  ngOnInit (){
    this.ListHomeCategoryProduct();
  }
  ListHomeCategoryProduct(){
    this.subscriptions.push(this.headerService.ListHomeCategoryProduct()
    .subscribe(response => {
      this.categoriesWithProducts=response.data;
      console.log(this.categoriesWithProducts);
    }));
  }
  getQueryString(param1: string): string {
    let params = new HttpParams()
      .set('id', param1)
      .set('Screen', 1);
    return `${"/Home/GetProductByCategory"}?${params.toString()}`;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
