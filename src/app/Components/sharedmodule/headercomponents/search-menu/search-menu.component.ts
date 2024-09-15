import { Component, Input, input } from '@angular/core';
import { MainCategoriesModel } from '../../../../model/common/header/main-categories-model';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrl: './search-menu.component.css'
})
export class SearchMenuComponent {
@Input() mainCategories:MainCategoriesModel[]|any;
}
