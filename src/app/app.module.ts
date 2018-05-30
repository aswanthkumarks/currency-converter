import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NglModule} from 'ng-lightning/ng-lightning';

import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';


@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    NglModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
