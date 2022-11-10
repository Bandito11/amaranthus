import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-goback',
  templateUrl: './goback.component.html',
  styleUrls: ['./goback.component.scss']
})
export class GobackComponent {

  constructor(private navCtrl: NavController) { }

  goBack() {
    this.navCtrl.pop();
  }

}
