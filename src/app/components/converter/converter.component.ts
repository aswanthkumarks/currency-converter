import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { CurrencyComponent,
  CurrencyComponentDestroy,
  CurrencyComponentUpdate,
  FetchCurrencyInfo} from '../../actions/currency.action';
import * as converionReducer from '../../reducers/currency.reducer';
import * as currencyRateReducer from '../../reducers/currency-ratio.reducer';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {
  @Input() key: string = 'XX';
  opened: Boolean = false;
  currencies: Array<string> = ['CAD', 'USD', 'EUR'];
  convertionComponents$: Observable<converionReducer.IConvertion[]>;
  currencyRate$: Observable<currencyRateReducer.ICurrencyRatio>;
  componentInfo: converionReducer.IConvertion = converionReducer.defaultItem;
  storeSub: ISubscription;
  storeRatioSub: ISubscription;
  currencyRate: currencyRateReducer.ICurrencyRatio;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new CurrencyComponent(this.key));
    this.convertionComponents$ = this.store.select(converionReducer.getConversionComponents);
    this.storeSub = this.convertionComponents$.subscribe(components => {
      this.componentInfo = _.find(components, { key: this.key });
    });

    this.currencyRate$ = this.store.select(currencyRateReducer.getCurrencyRatio);
    this.storeRatioSub = this.currencyRate$.subscribe(data => {
      this.currencyRate = data;
    });

    if (this.currencyRate.date === '') {
      this.store.dispatch(new FetchCurrencyInfo());
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new CurrencyComponentDestroy(this.key));
    this.storeSub.unsubscribe();
    this.storeRatioSub.unsubscribe();
  }

  /**
   * For updating the store and initating convertion process
   * @param field form field which is changed
   */
  updateForm(field) {
    this.convertAmount(
      {
        ...this.componentInfo, [field]: _.get(this.componentInfo, field, '')
      }
    );
    this.store.dispatch(new CurrencyComponentUpdate(
      this.key, field, _.get(this.componentInfo, field, '')
    ));
  }

  convertAmount(currencyInfo) {
    const fromCODE = currencyInfo.currencyFromCode;
    const toCODE = currencyInfo.currencyToCode;
    const fromValue = currencyInfo.currencyFromValue;
    const baseCODE = this.currencyRate.base;
    const rates = this.currencyRate.rates;
    let baseValue = fromValue;
    let convertedAmount = 0;
    if (fromCODE !== baseCODE) {
      baseValue = fromValue / rates[fromCODE];
    }
    convertedAmount = baseValue * rates[toCODE];

    this.store.dispatch(new CurrencyComponentUpdate(
      this.key, 'currencyToValue', convertedAmount.toFixed(2).toString()
    ));
  }

  /**
   * To open discamer popup
   */
  open() {
    this.opened = !this.opened;
  }

  /**
   * To Close disclamer popup
   */
  cancel() {
    this.opened = false;
  }

}

