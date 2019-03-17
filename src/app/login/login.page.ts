import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { ISimpleAlertOptions } from '../common/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private alertCtrl: AlertController,
    private db: AmaranthusDBProvider,
    public navCtrl: NavController
  ) { }


  checkUser(opts: { username: string; password }) {
    const response = this.db.checkIfUserExists(opts);
    let options: ISimpleAlertOptions;
    if (response.success) {
      options = {
        header: 'Success!',
        message: `${response.data} is present today!`
      };
    } else {
      options = {
        header: 'Error!',
        message: response.error
      };
    }
    this.showSimpleAlert(options);
  }

  private async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl
      .create({
        header: options.header,
        message: options.message,
        buttons: options.buttons
      });
    alert.present();
  }

}
