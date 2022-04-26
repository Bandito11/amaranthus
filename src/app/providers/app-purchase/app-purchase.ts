import { Injectable } from '@angular/core';
import { InAppPurchase2 } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';

@Injectable({
  providedIn: 'root'
})
export class AppPurchaseProvider {

  constructor(private store: InAppPurchase2) {
  }

  /**
   * Restore purchase
   */
  restoreAndroidPurchase() {
    throw new Error('Method not implemented.');
  }

  restoreiOSPurchase() {
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
    const products = this.store.get('master.key')
    alert(products)
    console.log(products)
    throw new Error('Method not implemented.');
  }
}
