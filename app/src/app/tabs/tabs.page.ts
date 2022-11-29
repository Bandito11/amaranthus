import { IonTabBar, Platform } from '@ionic/angular';
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
  selectedTab: string;

  htmlControls = {
    menu: '',
    home: '',
    calendar: '',
    stats: '',
    settings: '',
    login: '',
  };

  LANGUAGE = {
    english: {
      menu: 'Menu',
      home: 'Home',
      calendar: 'Calendar',
      stats: 'Stats',
      settings: 'Settings',
      login: 'Check In',
    },
    spanish: {
      menu: 'Menú',
      home: 'Inicio',
      calendar: 'Calendario',
      stats: 'Estadísticas',
      settings: 'Configuración',
      login: 'Registro',
    },
  };

  constructor(public platform: Platform, public storage: Storage) {}

  ngOnInit() {
    this.storage.get('language').then((value) => {
      if (value) {
        this.htmlControls = this.LANGUAGE[value];
      } else {
        this.htmlControls = this.LANGUAGE['english'];
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
