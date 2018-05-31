import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { CurrencyActionTypes, CurrencyActionsUnion } from '../actions/currency.action';

export interface IConvertion {
    key: string;
    currencyFromCode: string;
    currencyFromValue: string;
    currencyToCode: string;
    currencyToValue: string;
    isLoading: Boolean;
}


const initialState: Array<IConvertion> = [];
export const defaultItem: IConvertion = {
    key: '1',
    currencyFromCode: 'USD',
    currencyFromValue: '0.00',
    currencyToCode: 'CAD',
    currencyToValue: '0.00',
    isLoading: false
};

export function reducer(state = initialState, action: CurrencyActionsUnion): Array<IConvertion> {
    switch (action.type) {
        case CurrencyActionTypes.newComponent:
            return [...state, {...defaultItem, key: action.payload }];
        case CurrencyActionTypes.updateCurrencyInfo:
            return state.map(item => {
                if (item.key === action.key) {
                    _.set(item, action.field, action.value);
                }
                return item;
            })
        default:
            return state;
    }

}
export const getConversionComponentState = createFeatureSelector<Array<IConvertion>>('currencyConversion');

export const getConversionComponents = createSelector(
    getConversionComponentState, (state: Array<IConvertion>) => state );
