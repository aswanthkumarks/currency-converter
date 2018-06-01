import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { CurrencyActionTypes, CurrencyActionsUnion } from '../actions/currency.action';

export interface ICurrencyRatio {
    base: string;
    date: string;
    rates: {
        [key: string]: number;
    };
}


const initialState: ICurrencyRatio = { base: '', date: '', rates: { CAD: 1, USD: 1, EUR: 1}};

export function reducer(state = initialState, action: CurrencyActionsUnion): ICurrencyRatio {
    switch (action.type) {
        case CurrencyActionTypes.updateCurrencyRatio:
            return { ...action.payload };
        default:
            return state;
    }

}
export const getCurrencyRatioState = createFeatureSelector<ICurrencyRatio>('currencyRatio');

export const getCurrencyRatio = createSelector(
    getCurrencyRatioState, (state: ICurrencyRatio) => state );
