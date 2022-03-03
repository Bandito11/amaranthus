import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { handleError } from '../common/handleError';
import { IStudent, ISimpleAlertOptions } from '../common/models';
import { trimText } from '../common/format';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';

declare const fs;
declare const process;

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  gender: string;
  picture;
  phoneNumber: string;
  idInput: string;

  counter = 0;

  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        create: '',
      },
    },
    change: '',
    reset: '',
    firstName: '',
    initial: '',
    lastName: '',
    gender: '',
    male: '',
    female: '',
    undisclosed: '',
    optional: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    class: '',
    father: '',
    mother: '',
    name: '',
    emergency: {
      title: '',
      relationship: '',
    },
  };

  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Create Record',
        buttons: {
          create: 'Create',
        },
      },
      change: 'Change',
      reset: 'Reset',
      firstName: 'First Name',
      initial: 'Middle Name',
      lastName: 'Last Name',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      undisclosed: 'Undisclosed',
      optional: 'Optional',
      address: 'Address',
      phone: 'Phone Number',
      city: 'City',
      state: 'State',
      class: 'Class',
      father: 'Father',
      mother: 'Mother',
      name: 'Name',
      emergency: {
        title: 'Emergency Contact',
        relationship: 'Relationship',
      },
    },
    spanish: {
      toolbar: {
        title: 'Crear Record',
        buttons: {
          create: 'Crear',
        },
      },
      change: 'Cambiar',
      reset: 'Reiniciar',
      firstName: 'Nombre',
      initial: 'Segundo Nombre',
      lastName: 'Apellidos',
      gender: 'Género',
      male: 'Masculino',
      female: 'Femenino',
      undisclosed: 'No revelado',
      optional: 'Opcional',
      address: 'Dirección',
      phone: 'Teléfono',
      city: 'Ciudad',
      state: 'Estado',
      class: 'Clase',
      father: 'Padre',
      mother: 'Madre',
      name: 'Nombre',
      emergency: {
        title: 'Contacto de Emergencia',
        relationship: 'Relación',
      },
    },
  };

  language;
  imgSrc;

  student: IStudent;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private db: AmaranthusDBProvider,
    private camera: Camera,
    private webview: WebView,
    private file: File,
    public platform: Platform,
    private storage: Storage,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.storage.get('language').then((value) => {
      if (value) {
        this.language = value;
        this.htmlControls = this.LANGUAGE[value];
      } else {
        this.language = 'english';
        this.htmlControls = this.LANGUAGE['english'];
      }
    });
    this.generateId();
    this.imgSrc = '/assets/profilePics/default.png';
    this.student = {
      gender: 'male',
      picture: '/assets/profilePics/default.png',
      phoneNumber: '',
    } as IStudent;
  }
  /**
   * AutoGenerates ID
   */
  generateId() {
    this.idInput = `XY${Math.ceil(Math.random() * 100000000)}`;
  }

 



  /**
   *
   * @param student Student data
   * Creates a student in database
   */
  async createStudent(student: IStudent) {

    let options: ISimpleAlertOptions = {
      header: '',
      message: '',
      buttons: [],
    };
    if (!student.firstName || !student.lastName || !student.id) {
      if (this.language === 'spanish') {
        options = {
          ...options,
          header: '¡Advertencia!',
          message: 'Algunos campos no contienen la información requerida.',
          buttons: ['Si'],
        };
      } else {
        options = {
          ...options,
          header: 'Warning!',
          message: "Some fields doesn't have the required info",
          buttons: ['Ok'],
        };
      }
      this.showSimpleAlert(options);
    } else if (
      student.id.includes('#') ||
      student.id.includes('/') ||
      student.id.includes('%')
    ) {
      if (this.language === 'spanish') {
        options = {
          ...options,
          header: '¡Advertencia!',
          message: 'El campo de ID no puede contener "#" o "/" o "%".',
          buttons: ['Si'],
        };
      } else {
        options = {
          ...options,
          header: 'Warning!',
          message: 'The ID field can\'t contain "#" or "/" or "%"',
          buttons: ['Ok'],
        };
      }
      this.showSimpleAlert(options);
    } else {
      const picture = this.validatePicture({
        gender: this.gender,
        picture: this.picture,
      });
      const studentTrimmed: IStudent = {
        ...trimText(student),
        picture: picture,
        gender: this.gender,
        isActive: true,
      };
      if (this.language === 'spanish') {
        const alert = await this.alertCtrl.create({
          header: '¡Advertencia!',
          message: `¿Estas seguro que quieres crear un récord para ${student.firstName} ${student.lastName}?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Si',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                // TODO: add generateID method here
                this.db
                  .insertStudent(studentTrimmed)
                  .then((response) => {
                    if (response.success === true) {
                      navTransition.then(() => {
                        const userCreatedMsg = {
                          header: '¡Éxito!',
                          message: `${student.firstName} ${student.lastName} ha sido creado.`,
                        };
                        this.showAdvancedAlert(userCreatedMsg);
                      });
                    } else {
                      const errorMsg = {
                        header: 'Error',
                        message: response.error,
                      };
                      navTransition.then(() =>
                        this.showAdvancedAlert(errorMsg)
                      );
                    }
                  })
                  .catch((error) => {
                    this.showSimpleAlert({
                      header: 'Error',
                      message: error.error,
                    });
                    this.generateId();
                  });
                return false;
              },
            },
          ],
        });
        alert.present();
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Warning!',
          message: `Are you sure you want to create a new record for ${student.firstName} ${student.lastName}?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Yes',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                this.db
                  .insertStudent(studentTrimmed)
                  .then((response) => {
                    if (response.success === true) {
                      navTransition.then(() => {
                        const userCreatedMsg = {
                          header: 'Success!',
                          message: `${student.firstName} ${student.lastName} was created.`,
                        };
                        this.showAdvancedAlert(userCreatedMsg);
                      });
                    } else {
                      const errorMsg = {
                        header: 'Error',
                        message: response.error,
                      };
                      navTransition.then(() =>
                        this.showAdvancedAlert(errorMsg)
                      );
                    }
                  })
                  .catch((error) => {
                    this.showSimpleAlert({
                      header: 'Error',
                      message: error.error,
                    });
                    this.generateId();
                  });
                return false;
              },
            },
          ],
        });
        alert.present();
      }
    }
  }

  /**
   *
   * @param options
   * Display a message on the screen
   */
  async showAdvancedAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // user has clicked the alert button
            // begin the alert's dismiss transition
            alert.dismiss().then(() => {
              this.modalCtrl.dismiss();
            });
            return false;
          },
        },
      ],
    });
    alert.present();
  }

  /**
   *
   * @param opts
   * Validates user's gender in order to choose a picture.
   */
  private validatePicture(opts: { gender: string; picture: string }) {
    if (opts.gender === 'male' && opts.picture === '') {
      opts.picture = './assets/profilePics/defaultMale.png';
    } else if (opts.gender === 'female' && opts.picture === '') {
      opts.picture = './assets/profilePics/defaultFemale.png';
    } else if (opts.gender === 'undisclosed' && opts.picture === '') {
      opts.picture = './assets/profilePics/defaultUndisclosed.png';
    }
    return opts.picture;
  }

  /**
   *
   * @param options
   * Show a message on the screen
   */
  private async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: options.buttons,
    });
    alert.present();
  }
}
