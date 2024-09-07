import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'features', 
    loadChildren: () => import('./Components/features/features.module').then(m => m.FeaturesModule)
  },
  { path: '', redirectTo: 'features', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
