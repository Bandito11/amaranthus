import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppPurchaseProvider {

  constructor() {
  }

  /**
   * Restore purchase
   */
  restoreAndroidPurchase() {
    throw new Error('Method not implemented.');
  }

  restoreiOSPurchase(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  /**
   * Buy Product
   */
  buy() {
    throw new Error('Method not implemented.');
  }

  /**
   * Return an array of products.
   */
  getProducts(){
    throw new Error('Method not implemented.');
  }
}
