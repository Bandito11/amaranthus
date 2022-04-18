import { Component, Input } from '@angular/core';
import {
  AlertController,
  NavController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ISimpleAlertOptions } from '../common/models';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';

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
        password: '',
      },
    },
    id: '',
    phone: '',
    submit: '',
    placeholder: '',
  };
  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Enter Form',
        buttons: {
          cancel: 'Close',
          password: 'Set Password',
        },
      },
      id: 'ID, Phone Number or Full Name with a space in between',
      phone: 'Phone Number',
      submit: 'Submit',
      placeholder: 'My credentials',
    },
    spanish: {
      toolbar: {
        title: 'Forma de Entrada',
        buttons: {
          cancel: 'Cerrar',
          password: 'Contraseña',
        },
      },
      id: 'Id, número de telefono o nombre completo con espacio entre medio',
      phone: 'Teléfono',
      submit: 'Someter',
      placeholder: 'Mis credenciales',
    },
  };
  language: any;

  constructor(
    private alertCtrl: AlertController,
    private dbService: DatabaseService,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.storage.get('language').then((value) => {
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
            placeholder: 'Contraseña',
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Ok',
            handler: async (val) => {
              if (val['password'] === this.modalVal) {
                this.modalCtrl.dismiss();
              }
            },
          },
        ],
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
            placeholder: 'Password',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Ok',
            handler: async (val) => {
              if (val['password'] === this.modalVal) {
                this.modalCtrl.dismiss();
              }
            },
          },
        ],
      });
      await alert.present();
    }
  }

  async checkUser(credentials) {
    let message;
    if (!credentials) {
      if (this.language === 'spanish') {
        message = `El campo no puede estar vacio.`;
      } else {
        message = `Username field can't be empty.`;
      }
      const toast = await this.toastController.create({
        message,
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
      return;
    }
    try {
      const user = this.dbService.checkIfUserExists(credentials);
      if (this.language === 'spanish') {
        message = `¡${user} esta presente hoy!`;
      } else {
        message = `${user} is present today!`;
      }
      const toast = await this.toastController.create({
        message,
        duration: 2500,
        position: 'top',
        color: 'success',
      });
      await toast.present();
    } catch (error) {
      if (this.language === 'spanish') {
        message = `El usuario no existe! Por favor, compruebe que sus entradas fueron escritas correctamente y vuelva a intentarlo
          Si se usó el nombre, verifique que haya un espacio entre el nombre y el apellido y
          Compruebe el uso correcto de mayúsculas.`;
      } else {
        message = `User does not exist! Please check that your entries were written correctly and try again!
          If the name was used please check that there is one space between the first name and last name and
          check for correct capitalization.`;
      }
      const toast = await this.toastController.create({
        message,
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    }
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
            placeholder: 'Password',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Ok',
            handler: async (val) => {
              if (val['password']) {
                const modal = await this.modalCtrl.create({
                  component: LoginPage,
                  backdropDismiss: false,
                  componentProps: { modalVal: val.password },
                });
                modal.present();
              }
            },
          },
        ],
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
            placeholder: 'Password',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Ok',
            handler: async (val) => {
              if (val['password']) {
                const modal = await this.modalCtrl.create({
                  component: LoginPage,
                  backdropDismiss: false,
                  componentProps: { modalVal: val.password },
                });
                modal.present();
              }
            },
          },
        ],
      });
      await alert.present();
    }
  }
}
