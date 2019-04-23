import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage
  ) { }

  htmlControls = {
    cancel: ''
  };

  LANGUAGE = {
    english: {
      cancel: 'Cancel'
    },
    spanish: {
      cancel: 'Cancelar'
    }
  };

  ngOnInit() {
    this.storage.get('language').then(value => {
      if (value) {
        this.htmlControls = this.LANGUAGE[value];
      } else {
        this.htmlControls = this.LANGUAGE['english'];
      }
    });
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

}
