import { Action } from '@ngrx/store';
import { IConvertion } from '../reducers/currency.reducer';

export enum CurrencyActionTypes {
    newComponent = '[Currency] Create Component',
    deleteComponent = '[Currency] Destroy Component',
    updateCurrencyInfo = '[Currency] Field Update',
    convertCurrency = '[Currency] Convert amount',
    convertionError = '[Currency] Convertion ERROR'
}

export class CurrencyComponent implements Action {
    readonly type = CurrencyActionTypes.newComponent;
    constructor(public payload: string) {}
  }

export class CurrencyComponentDestroy implements Action {
    readonly type = CurrencyActionTypes.deleteComponent;
    constructor(public payload: string) {}
}

export class CurrencyComponentUpdate implements Action {
    readonly type = CurrencyActionTypes.updateCurrencyInfo;
    constructor(public key: string, public field: string, public value: string) {}
}

export class CurrencyConvertionUpdate implements Action {
    readonly type = CurrencyActionTypes.updateCurrencyInfo;
    readonly field = 'currencyToValue';
    constructor(public key: string, public value: string) {}
}

export class ConvertCurrency implements Action {
    readonly type = CurrencyActionTypes.convertCurrency;
    constructor(public payload: IConvertion) {}
}

export class CurrencyConvertionError implements Action {
    readonly type = CurrencyActionTypes.convertionError;
    constructor(public payload: any) {}
}

export type CurrencyActionsUnion =
    CurrencyComponent |
    CurrencyComponentDestroy |
    CurrencyComponentUpdate |
    ConvertCurrency |
    CurrencyConvertionUpdate |
    CurrencyConvertionError ;
