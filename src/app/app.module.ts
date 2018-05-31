import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {NglModule} from 'ng-lightning/ng-lightning';

import { AppComponent } from './components/app.component';
import { ConverterComponent } from './components/converter/converter.component';

import { CurrencyService } from './services/currency.service';

import { environment } from '../environments/environment';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers, {  }),//metaReducers
    NglModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [ CurrencyService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
