import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class CurrencyService {

  constructor(private http: HttpClient) { }

  /**
   * Get convertion information from forex service provider
   */
  fetchCurrencyRate() {
    return this.http.get(
      `${environment.forex_api}/latest?access_key=${environment.forex_key}&symbols=CAD,USD,EUR`
    );
  }

}
