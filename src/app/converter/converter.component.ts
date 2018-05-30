import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  opened: boolean = false;
  currencies: Array<string> = ["CAD", "USD", "EUR"];

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.opened = !this.opened;
  }

  cancel() {
    this.opened = false;
  }

}

