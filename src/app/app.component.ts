import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('mobile') && this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#e60000' });
      }
      await SplashScreen.hide();
    });
  }
}
