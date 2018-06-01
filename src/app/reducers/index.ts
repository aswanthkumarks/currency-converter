import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import * as currencyReducer from './currency.reducer';
import * as currencyRatio from './currency-ratio.reducer';
import { environment } from '../../environments/environment';

export interface AppState {
    currencyConversion: Array<currencyReducer.IConvertion>;
    currencyRatio: currencyRatio.ICurrencyRatio;
}

export const reducers: ActionReducerMap<AppState> = {
    currencyConversion: currencyReducer.reducer,
    currencyRatio: currencyRatio.reducer
};
