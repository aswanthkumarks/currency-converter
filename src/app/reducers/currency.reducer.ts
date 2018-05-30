import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrencyActionTypes, CurrencyActionsUnion } from '../actions/currency.action';

export interface IConvertionComponents {
    components: Array<IConvertion>;
}
export interface IConvertion {
    key: string;
    currencyFromCode: string;
    currencyFromValue: string;
    currencyToCode: string;
    currencyToValue: string;
}


const initialState: IConvertionComponents = { components: [] };
const defaultItem: IConvertion = {
    key: '1', currencyFromCode: 'USD', currencyFromValue: '0.00', currencyToCode: 'CAN', currencyToValue: '0.00'
};

export function reducer(state = initialState, action: CurrencyActionsUnion): IConvertionComponents {
    switch (action.type) {
        case CurrencyActionTypes.newComponent:
            return {
                components: [...state.components, {...defaultItem, key: action.payload }]
            };
        default:
            return state;
    }

}
export const getConversionComponentState = createFeatureSelector<IConvertionComponents>('currencyConversion');

export const getConversionComponents = createSelector(
    getConversionComponentState, (state: IConvertionComponents) => state.components );
