import { Component, Input } from '@angular/core';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { ISimpleAlertOptions } from '../common/models';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  homeURL = '/tabs/tabs/login';
  @Input() modalVal: string;
  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        cancel: '',
        password: ''
      }
    },
    id: '',
    phone: '',
    submit: ''
  };
  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Login',
        buttons: {
          cancel: 'Cancel',
          password: 'Set Password'
        }
      },
      id: 'ID or Full Name with a space in between',
      phone: 'Phone Number',
      submit: 'Submit'
    },
    spanish: {
      toolbar: {
        title: 'Sesión',
        buttons: {
          cancel: 'Cancelar',
          password: 'Contraseña'
        }
      },
      id: 'Id o nombre completo con espacio entre medio',
      phone: 'Teléfono',
      submit: 'Someter'
    }
  };
  constructor(
    private alertCtrl: AlertController,
    private db: AmaranthusDBProvider,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private storage: Storage
  ) { }

  ionViewWillEnter() {
    this.storage.get('language').then(value => {
      if (value) {
        this.htmlControls = this.LANGUAGE[value];
      } else {
        this.htmlControls = this.LANGUAGE['english'];
      }
    });
  }

  async cancel() {
    const alert = await this.alertCtrl.create({
      header: 'Information',
      subHeader: `Enter password to go back to Main Screen.`,
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ok',
          handler: async (val) => {
            if (val['password'] === this.modalVal) {
              this.modalCtrl.dismiss();
            }
          }
        }
      ]
    });
    await alert.present();

  }
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

  async goToLogin() {
    const alert = await this.alertCtrl.create({
      header: 'Information',
      subHeader: `This component will create a new Login Screen that cannot be canceled
      unless a password is entered when the CANCEL button is pressed in the next screen.
       If you forget the password simply close the app. None of the attendance data will
       be lost if properly entered will be lost.`,
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ok',
          handler: async (val) => {
            if (val['password']) {
              const modal = await this.modalCtrl.create({
                component: LoginPage,
                backdropDismiss: false,
                componentProps: { modalVal: val.password }
              });
              modal.present();
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
