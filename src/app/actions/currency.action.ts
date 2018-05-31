import { Action } from '@ngrx/store';

export enum CurrencyActionTypes {
    newComponent = '[Currency] Create Component',
    deleteComponent = '[Currency] Destroy Component',
    updateCurrencyInfo = '[Currency] Field Update'
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

export type CurrencyActionsUnion =
    CurrencyComponent |
    CurrencyComponentDestroy |
    CurrencyComponentUpdate ;
