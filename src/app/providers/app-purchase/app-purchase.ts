import { ApplicationRef, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  IAPProduct,
  InAppPurchase2,
} from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { productKey } from 'src/app/common/constants';
import { handleError } from 'src/app/common/handleError';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AppPurchaseProvider {
  products: IAPProduct[];
  constructor(
    private store: InAppPurchase2,
    private storage: Storage,
    private platform: Platform,
    private ref: ApplicationRef
  ) {
    this.products = [];
    this.platform.ready().then(() => {
      this.registerProducts();
      this.setListeners();
      this.store.ready(() => {
        this.products = this.store.products;
        this.ref.tick();
      });
    });
  }

  getProducts() {
    if (this.products.length < 1) {
      const product = this.store.get('master.key');
      if (!product['error']) {
        this.store.refresh();
        this.products.push(product);
      }
    }
  }

  registerProducts() {
    this.store.register({
      id: 'master.key',
      type: this.store.NON_CONSUMABLE,
    });
    this.store.refresh();
  }

  setListeners() {
    // this.store.when('product').cancelled(() => {
    //   reject();
    // });
    // this.store.when('product').error((error) => {
    //   handleError(error);
    // });
    this.store
      .when('product')
      .approved(async (value: IAPProduct) => {
        if (value.id === 'master.key') {
          await this.storage.set(productKey, true);
        }
        this.ref.tick();
        return value.verify();
      })
      .verified((value) => value.finish());

    this.store
      .when('master.key')
      .owned(async () => await this.storage.set(productKey, true));
  }

  /**
   * Restore purchase
   */
  async checkIfOwned() {
    this.store.refresh();
  }

  /**
   * Buy Product
   */
  async buy(product: IAPProduct) {
    // return new Promise((resolve, reject) => {
    // this.store.when(product).cancelled(() => {
    //   reject();
    // });
    // this.store.when(product).error((error) => {
    //   resolve(error);
    // });
    // this.store.when(product).approved(async (value: IAPProduct) => {
    //   await this.storage.set(productKey, true);
    //   resolve('bought');
    //   value.finish();
    // });
    this.store.order(product).error((error) => handleError(error));
    // });
  }
}
