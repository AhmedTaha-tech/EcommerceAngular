import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeaderServiceService } from '../header/header-service.service';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  constructor(private http: HttpClient) { }
  ListHomeCategoryProduct(): Observable<any> {
    return this.http.get(`${environment.apiHost}ListHomeCategoryProduct?lang='en'`);
  }
}
