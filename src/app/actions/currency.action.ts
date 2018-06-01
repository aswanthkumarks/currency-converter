import { Action } from '@ngrx/store';
import { IConvertion } from '../reducers/currency.reducer';

/**
 * Action type constants
 */
export enum CurrencyActionTypes {
    newComponent = '[Currency] Create Component',
    deleteComponent = '[Currency] Destroy Component',
    updateCurrencyInfo = '[Currency] Field Update',
    convertionError = '[Currency] Convertion ERROR',
    fetchCurrencyRatio = '[Currency] Fetch Ratio',
    updateCurrencyRatio = '[Currency] Ratio'
}

/**
 * Action object to add default convertion component information
 * @param payload string an identifier used to identify component info
 */
export class CurrencyComponent implements Action {
    readonly type = CurrencyActionTypes.newComponent;
    constructor(public payload: string) {}
  }
/**
 * Action object to remove convertion component info
 */
export class CurrencyComponentDestroy implements Action {
    readonly type = CurrencyActionTypes.deleteComponent;
    constructor(public payload: string) {}
}

/**
 * Updates specifi field of a convertion component info
 * @param key identifier of component
 * @param field field to be updated
 * @param value value to be updated for the specified field
 */
export class CurrencyComponentUpdate implements Action {
    readonly type = CurrencyActionTypes.updateCurrencyInfo;
    constructor(public key: string, public field: string, public value: string) {}
}

/**
 * Action triggered on convertion api error
 * @param payload error object
 */
export class CurrencyConvertionError implements Action {
    readonly type = CurrencyActionTypes.convertionError;
    constructor(public payload: any) {}
}

export class FetchCurrencyInfo implements Action {
    readonly type = CurrencyActionTypes.fetchCurrencyRatio;
}

export class CurrencyRatioInfo implements Action {
    readonly type = CurrencyActionTypes.updateCurrencyRatio;
    constructor(public payload: any) {}
}

export type CurrencyActionsUnion =
    CurrencyComponent |
    CurrencyComponentDestroy |
    CurrencyComponentUpdate |
    CurrencyConvertionError |
    CurrencyRatioInfo |
    FetchCurrencyInfo ;
