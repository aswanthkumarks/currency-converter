import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { ICurrencyRatio } from '../reducers/currency-ratio.reducer';
import { CurrencyService } from '../services/currency.service';
import {
  CurrencyActionTypes, CurrencyConvertionError,
  FetchCurrencyInfo, CurrencyRatioInfo
} from '../actions/currency.action';

@Injectable()
export class CurrencyEffects {

  @Effect()
  currencyRatio$: Observable<Action> = this.actions$.pipe(
    ofType<FetchCurrencyInfo>(CurrencyActionTypes.fetchCurrencyRatio),
    switchMap(query => {
      const nextSearch$ = this.actions$.pipe(
        ofType(CurrencyActionTypes.fetchCurrencyRatio),
        skip(1)
      );

      return this.currencyService
        .fetchCurrencyRate()
        .pipe(
          takeUntil(nextSearch$),
          map((result: ICurrencyRatio) => new CurrencyRatioInfo(result)),
          catchError(err =>  of(new CurrencyConvertionError(err)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private currencyService: CurrencyService
  ) {}
}
