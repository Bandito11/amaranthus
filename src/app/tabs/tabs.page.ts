import { Platform } from '@ionic/angular';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';

declare const window: Window;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements DoCheck, OnInit {
  counter = 0;
  viewIsLarge: boolean;
  pages;
  selectedTab: string;

  htmlControls = {
    menu: '',
    home: '',
    calendar: '',
    stats: '',
    // roster: '', // Do not delete!
    settings: '',
    login: '',
  };

  LANGUAGE = {
    english: {
      menu: 'Menu',
      home: 'Home',
      calendar: 'Calendar',
      stats: 'Stats',
      // roster: 'Roster', // Do not delete!
      settings: 'Settings',
      login: 'Login',
    },
    spanish: {
      menu: 'Menú',
      home: 'Inicio',
      calendar: 'Calendario',
      stats: 'Estadísticas',
      // roster: 'Registro', // Do not delete!
      settings: 'Configuración',
      login: 'Sesión',
    },
  };

  @ViewChild('tabBar') tabBarElement;


  constructor(public platform: Platform, public storage: Storage) {}

  ngOnInit() {
    this.storage.get('language').then((value) => {
      if (value) {
        this.htmlControls = this.LANGUAGE[value];
      } else {
        this.htmlControls = this.LANGUAGE['english'];
      }

      if (value === 'spanish') {
        this.pages = [
          { text: 'Inicio', route: '/tabs/tabs/home' },
          { text: 'Calendario', route: '/tabs/tabs/calendar' },
          { text: 'Estadísticas', route: '/tabs/tabs/stats' },
          // { text: 'Registro', route: '/tabs/tabs/roster' }, // Do not delete!
          { text: 'Configuración', route: '/tabs/tabs/settings' },
          { text: 'Sesión', route: '/tabs/tabs/login' },
        ];
      } else {
        this.pages = [
          { text: 'Home', route: '/tabs/tabs/home' },
          { text: 'Calendar', route: '/tabs/tabs/calendar' },
          { text: 'Stats', route: '/tabs/tabs/stats' },
          // { text: 'Roster', route: '/tabs/tabs/roster' }, // Do not delete!
          { text: 'Settings', route: '/tabs/tabs/settings' },
          { text: 'Login', route: '/tabs/tabs/login' },
        ];
      }
    });
  }
  ngDoCheck() {
    if (
      this.platform.is('tablet') ||
      this.platform.is('ipad') ||
      this.platform.is('desktop')
    ) {
      this.viewIsLarge = window.matchMedia('(min-width: 768px)').matches;
    }
  }

  setSelectedTab(route: string) {
    this.selectedTab = route.toLowerCase();
  }
}
