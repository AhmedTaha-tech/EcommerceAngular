import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModuleModule } from './app/app-module.module';


platformBrowserDynamic().bootstrapModule(AppModuleModule).then(ref => {

}).catch(err => console.error(err));