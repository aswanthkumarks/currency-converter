import { Action } from '@ngrx/store';

export enum CurrencyActionTypes {
    newComponent = '[Currency] Create Component',
    deleteComponent = '[Currency] Destroy Component',
}

export class CurrencyComponent implements Action {
    readonly type = CurrencyActionTypes.newComponent;
    constructor(public payload: string) {}
  }

export type CurrencyActionsUnion = CurrencyComponent;
