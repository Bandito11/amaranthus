import { Component } from '@angular/core';
import { InAppPurchase2 } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';

import { Platform } from '@ionic/angular';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private platform: Platform, private dbService: DatabaseService, private store: InAppPurchase2) {
    this.dbService.initializeDatabase();
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('mobile') && this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#e60000' });
      }
      if (this.platform.is('mobile')){
        
      }

      await SplashScreen.hide();
    });
  }
}
