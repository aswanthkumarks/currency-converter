import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
// import { asyncScheduler, empty } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { IConvertion } from '../reducers/currency.reducer';
import { CurrencyService } from '../services/currency.service';
import {
  CurrencyActionTypes, ConvertCurrency, CurrencyConvertionUpdate, CurrencyConvertionError
} from '../actions/currency.action';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');

interface IConvertionResponse {
  base: string;
  rates: {
    CAD: string;
    USD: string;
    EUR: string;
  };
  date: string;
}

@Injectable()
export class CurrencyEffects {
  @Effect()
  convert$: Observable<Action> = this.actions$.pipe(
    ofType<ConvertCurrency>(CurrencyActionTypes.convertCurrency),
    // debounceTime(this.debounce || 300, asyncScheduler),
    map(action => action.payload),
    switchMap(query => {
      console.log('query',query);

      const nextSearch$ = this.actions$.pipe(
        ofType(CurrencyActionTypes.convertCurrency),
        skip(1)
      );

      return this.currencyService
        .convertCurrency(query)
        .pipe(
          takeUntil(nextSearch$),
          map((result: IConvertionResponse) => {
            const amount = this.convertAmount(query, result);
            return new CurrencyConvertionUpdate(query.key, amount);
          }),
          catchError(err =>  of(new CurrencyConvertionError(err)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private currencyService: CurrencyService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number,
  ) {}

  convertAmount(currencyInfo, convertionHelper) {
    const fromCODE = currencyInfo.currencyFromCode;
    const toCODE = currencyInfo.currencyToCode;
    const fromValue = currencyInfo.currencyFromValue;
    const baseCODE = convertionHelper.base;
    const rates = convertionHelper.rates;
    let baseValue = fromValue;
    let convertedAmount = 0;
    if (fromCODE !== baseCODE) {
      baseValue = fromValue / rates[fromCODE];
    }
    convertedAmount = baseValue * rates[toCODE];

    return convertedAmount.toFixed(2).toString();
  }
}
