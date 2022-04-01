import { ModalController, AlertController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { IStudent, ISimpleAlertOptions } from '../common/models';
import { trimText } from '../common/format';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';

declare const fs;
declare const process;

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
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
      submit: 'Submit',
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
      submit: 'Someter',
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
    private dbService: DatabaseService,
    public platform: Platform,
    private storage: Storage
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

    this.imgSrc = '/assets/profilePics/default.png';
    this.student = {
      id: this.generateId(),
      gender: 'male',
      picture: '/assets/profilePics/default.png',
      phoneNumber: '',
    } as IStudent;
  }
  /**
   * AutoGenerates ID
   */
  generateId() {
    return `XY${Math.ceil(Math.random() * 100000000)}`;
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
      student.id.includes('%') ||
      student.id.includes(';')
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
        gender: student.gender,
        picture: student.picture,
      });
      const studentTrimmed: IStudent = {
        ...trimText(student),
        picture: student.picture,
        gender: student.gender,
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
              handler: async () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                try {
                  await this.dbService.insertStudent(studentTrimmed);
                  navTransition.then(() => {
                    const userCreatedMsg = {
                      header: '¡Éxito!',
                      message: `${student.firstName} ${student.lastName} ha sido creado.`,
                    };
                    this.showAdvancedAlert(userCreatedMsg);
                  });
                } catch (error) {
                  const errorMsg = {
                    header: 'Error',
                    message: `Se alcanzó el límite de 10 personas en la base de datos. Si desea deshacerse de este límite, ¡considere comprar la aplicación!`,
                  };
                  navTransition.then(() => this.showAdvancedAlert(errorMsg));
                  this.generateId();
                }
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
              handler: async () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                try {
                  Promise.race([
                    await alert.dismiss(),
                    await this.dbService.insertStudent(studentTrimmed),
                  ]);
                  const userCreatedMsg = {
                    header: 'Success!',
                    message: `${student.firstName} ${student.lastName} was created.`,
                  };

                  this.showAdvancedAlert(userCreatedMsg);
                } catch (error) {
                  const errorMsg = {
                    header: 'Error',
                    message: `Reached the limit of 10 persons in database. If you want to get rid of this limit, please consider buying the app!`,
                  };
                  await alert.dismiss();
                  this.showAdvancedAlert(errorMsg);
                  this.generateId();
                }
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
    await alert.present();
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
