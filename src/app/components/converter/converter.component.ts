import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CurrencyComponent } from '../../actions/currency.action';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  opened: Boolean = false;
  currencies: Array<string> = ['CAD', 'USD', 'EUR'];

  // constructor(private store: Store<any>) { }

  ngOnInit() {
    // this.store.dispatch(new CurrencyComponent('5'));
  }

  open() {
    this.opened = !this.opened;
  }

  cancel() {
    this.opened = false;
  }

}

