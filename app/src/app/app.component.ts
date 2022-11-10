import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private dbService: DatabaseService,
    private storage: Storage
  ) {
    this.dbService.initializeDatabase();
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('mobile') && this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#e60000' });
      }

      if (navigator.userAgent.match('Windows') || this.platform.is('mobileweb')) {
        this.storage.set('boughtMasterKey', true);
      }
      await SplashScreen.hide();
    });
  }
}
