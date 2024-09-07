import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedmoduleModule } from './Components/sharedmodule/sharedmodule.module';
import { HttpClientModule } from '@angular/common/http';
import { FeaturesModule } from './Components/features/features.module';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet,FeaturesModule,SharedmoduleModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ECommerce';
}
