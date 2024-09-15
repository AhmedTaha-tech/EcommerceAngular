import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { FavoriteProductsComponent } from './favorite-products/favorite-products.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
  { path: 'features', component: HomeComponent },
  // { path: '/login', component: LoginComponent },
  // { path: '/signup', component: SignupComponent },
  // { path: '/userprofilepage', component: UserProfilePageComponent },
  // { path: '/advertisement', component: AdvertisementComponent },
  // { path: '/favoriteproducts', component: FavoriteProductsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule { }
