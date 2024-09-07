import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListHeaderCategories } from '../../model/common/header/list-header-categories';
import { environment } from '../../../environments/environment.development';
import { MainCategoriesModel } from '../../model/common/header/main-categories-model';

@Injectable({
  providedIn: 'root'
})
export class HeaderServiceService {
  static urlApi = `${environment.apiHost}`;

  constructor(private http: HttpClient) { }

  ListHeaderCategories(): Observable<any> {
    return this.http.get(`${HeaderServiceService.urlApi}ListHeaderCategories`);
  }

  ListMainCategories(): Observable<any> {
    return this.http.get<MainCategoriesModel[]>(`${HeaderServiceService.urlApi}ListAllCategory?isShowInHome=true`);
  }
}
