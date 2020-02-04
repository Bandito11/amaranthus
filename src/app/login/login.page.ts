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

  @Input() htmlControls = {
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
        title: 'Enter Form',
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
        title: 'Forma de Entrada',
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
  language: any;

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
        this.language = value;
        this.htmlControls = this.LANGUAGE[value];
      } else {
        this.language = 'english';
        this.htmlControls = this.LANGUAGE['english'];
      }
    });
  }


  async cancel() {
    if (this.language === 'spanish') {
      const alert = await this.alertCtrl.create({
        header: 'Información',
        subHeader: `Entra la contraseña para volver a la pantalla principal.`,
        inputs: [
          {
            name: 'password',
            type: 'password',
            placeholder: 'Contraseña'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
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
    } else {
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

  }
  checkUser(opts: { username, password }) {
    let options: ISimpleAlertOptions;
    if (!opts.username) {
      if (this.language === 'spanish') {
        options = {
          header: 'Error',
          message: `El campo de Usuario no puede estar vacio.`
        };
      } else {
        options = {
          header: 'Error',
          message: `Username field can't be empty.`
        };
      }
    }
    if (!opts.password) {
      if (this.language === 'spanish') {
        options = {
          header: 'Error',
          message: `El campo de Contraseña no puede estar vacio.`
        };
      } else {
        options = {
          header: 'Error',
          message: `El campo de Contraseña no puede estar vacio.`
        };
      }
      this.showSimpleAlert(options);
      return;
    }
    const response = this.db.checkIfUserExists(opts);
    if (response.success) {
      if (this.language === 'spanish') {
        options = {
          header: '¡Éxito!',
          message: `¡${response.data} esta presente hoy!`
        };
      } else {
        options = {
          header: 'Success!',
          message: `${response.data} is present today!`
        };
      }
    } else {
      if (this.language === 'spanish') {
        options = {
          header: '¡Error!',
          message: `El usuario no existe! Por favor, compruebe que sus entradas fueron escritas correctamente y vuelva a intentarlo
          Si se usó el nombre, verifique que haya un espacio entre el nombre y el apellido y
          Compruebe el uso correcto de mayúsculas.`
        };
      } else {
        options = {
          header: 'Error!',
          message: `User does not exist! Please check that your entries were written correctly and try again!
          If the name was used please check that there is one space between the first name and last name and
          check for correct capitalization.`
        };
      }
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
    if (this.language === 'spanish') {
      const alert = await this.alertCtrl.create({
        header: 'Information',
        subHeader: `Este componente creará una nueva pantalla de inicio de sesión que no se puede cancelar
        a menos que se ingrese una contraseña cuando se presiona el botón CANCELAR en la siguiente pantalla.
         Si olvida la contraseña simplemente cierre la aplicación. Ninguno de los datos de asistencia
         se perderá si se ingresa correctamente.`,
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
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Information',
        subHeader: `This component will create a new Login Screen that cannot be canceled
        unless a password is entered when the CANCEL button is pressed in the next screen.
         If you forget the password simply close the app. None of the attendance data will
         be lost if properly entered.`,
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

}
