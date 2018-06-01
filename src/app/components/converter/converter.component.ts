import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { CurrencyComponent,
  CurrencyComponentDestroy,
  ConvertCurrency,
  CurrencyComponentUpdate } from '../../actions/currency.action';
import * as converionReducer from '../../reducers/currency.reducer';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {
  @Input() key: string = 'XX';
  opened: Boolean = false;
  currencies: Array<string> = ['CAD', 'USD', 'EUR'];
  convertionComponents: Observable<converionReducer.IConvertion[]>;
  componentInfo: converionReducer.IConvertion = converionReducer.defaultItem;
  storeSub: ISubscription;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new CurrencyComponent(this.key));
    this.convertionComponents = this.store.select(converionReducer.getConversionComponents);
    this.storeSub = this.convertionComponents.subscribe(components => {
      this.componentInfo = _.find(components, { key: this.key });
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new CurrencyComponentDestroy(this.key));
    this.storeSub.unsubscribe();
  }

  updateForm(field) {
    console.log(this.componentInfo);
    this.store.dispatch(new ConvertCurrency(
      {
        ...this.componentInfo, [field]: _.get(this.componentInfo, field, '')
      }
    ));
    this.store.dispatch(new CurrencyComponentUpdate(
      this.key, field, _.get(this.componentInfo, field, '')
    ));
  }

  open() {
    this.opened = !this.opened;
  }

  cancel() {
    this.opened = false;
  }

}

