import { Component } from '@angular/core';
import { Platform, IonSplitPane } from '@ionic/angular';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent {

  constructor(
    private platform: Platform,
    private splitPane: IonSplitPane
    ) { }

  hideSplitPane() {
    if (this.splitPane.disabled) {
      this.splitPane.disabled = false;
    } else {
      this.splitPane.disabled = true;
    }
  }

  checkSplitPane() {
    if (
      (this.platform.is('iphone') || (this.platform.is('android') && !this.platform.is('tablet')))
    ) {
      return false;
    } else {
      if (this.platform.isLandscape()) {
        return true;
      } else {
        return false;
      }
    }
  }
}
