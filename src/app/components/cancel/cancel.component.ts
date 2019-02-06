import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent  {

  constructor(private modalCtrl: ModalController) { }

  goBack() {
    this.modalCtrl.dismiss();
  }

}
