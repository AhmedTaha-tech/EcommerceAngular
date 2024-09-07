import { Component, OnInit } from "@angular/core";
import { ListHeaderCategories } from "../../../model/common/header/list-header-categories";
import { HeaderServiceService } from "../../../services/header/header-service.service";
import { HttpParams } from "@angular/common/http";
import { MainCategoriesModel } from "../../../model/common/header/main-categories-model";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private headerService: HeaderServiceService) { }
  heasderCategories:ListHeaderCategories[]|undefined;
  mainCategories:MainCategoriesModel[]|undefined;
  ngOnInit (){
    this.ListHeaderCategories();
    this.ListMainCategories();
  }
  ListHeaderCategories(){
    this.headerService.ListHeaderCategories()
    .subscribe(response => {
      this.heasderCategories=response.data;
    });
  }
  ListMainCategories(){
    this.headerService.ListMainCategories()
    .subscribe(response => {
      this.mainCategories=response.data;
    });
  }
  
  getQueryString(param1: string): string {
    let params = new HttpParams()
      .set('id', param1)
      .set('Screen', 1);
    return `${"/Home/GetProductByCategory"}?${params.toString()}`;
  }
}
