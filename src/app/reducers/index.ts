import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import * as currencyReducer from './currency.reducer';
import { environment } from '../../environments/environment';

export interface AppState {
    currencyConversion: currencyReducer.IConvertionComponents;
}

export const reducers: ActionReducerMap<AppState> = {
    currencyConversion: currencyReducer.reducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action: any): AppState {
      console.log('state', state);
      console.log('action', action);
      return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger]
    : [];
