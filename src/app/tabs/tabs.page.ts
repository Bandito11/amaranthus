import { Platform } from '@ionic/angular';
import { Component, DoCheck } from '@angular/core';

declare const window: Window;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements DoCheck {
  counter = 0;
  viewIsLarge: boolean;
  pages = [
    { text: 'Home', route: '/tabs/tabs/home' },
    { text: 'Calendar', route: '/tabs/tabs/calendar' },
    { text: 'Stats', route: '/tabs/tabs/stats' },
    { text: 'Roster', route: '/tabs/tabs/roster' },
    { text: 'Settings', route: '/tabs/tabs/settings' },
    { text: 'Login', route: '/tabs/tabs/login' }
  ];

  selectedTab: string;

  constructor(public platform: Platform) { }

  ngDoCheck() {
    if (this.platform.is('tablet') || this.platform.is('ipad') || this.platform.is('desktop')) {
      this.viewIsLarge = window.matchMedia('(min-width: 992px)').matches;
    }
  }

  setSelectedTab(route: string) {
    this.selectedTab = route.toLowerCase();
  }
}
