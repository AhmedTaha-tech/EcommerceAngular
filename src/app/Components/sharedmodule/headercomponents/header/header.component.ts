import { Component, OnDestroy, OnInit } from "@angular/core";
import { ListHeaderCategories } from "../../../../model/common/header/list-header-categories";
import { HeaderServiceService } from "../../../../services/header/header-service.service";
import { HttpParams } from "@angular/common/http";
import { MainCategoriesModel } from "../../../../model/common/header/main-categories-model";
import { Subscription } from "rxjs";
import { LocalStorageService } from "../../../../services/common/local-storage.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit ,OnDestroy {
  subscriptions: Subscription[]= [];
  userName:string="";
  firstName:string="";
  language:string="";
  constructor(private headerService: HeaderServiceService,private localStorageService: LocalStorageService) { }
  heasderCategories:ListHeaderCategories[]|undefined;
  mainCategories:MainCategoriesModel[]|undefined;
  ngOnInit (){
    this.ListHeaderCategories();
    this.ListMainCategories();
    this.userName=this.localStorageService.retrieveUserNameFromLocalStorage();
    this.firstName=this.localStorageService.retrieveUserFirstNameFromLocalStorage();
    this.language=this.localStorageService.retrieveUserNameFromLocalStorage();
  }
  ListHeaderCategories(){
    this.subscriptions.push(this.headerService.ListHeaderCategories()
    .subscribe(response => {
      this.heasderCategories=response.data;
    }));
  }
  ListMainCategories(){
    this.subscriptions.push(this.headerService.ListMainCategories()
    .subscribe(response => {
      this.mainCategories=response.data;
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
