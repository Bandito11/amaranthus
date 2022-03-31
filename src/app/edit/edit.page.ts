import { DomSanitizer } from '@angular/platform-browser';
import { OnInit, Component } from '@angular/core';
import { IStudent, ISimpleAlertOptions } from '../common/models';
import {
  AlertController,
  NavController,
  NavParams,
  Platform,
  ModalController,
} from '@ionic/angular';
import { handleError } from '../common/handleError';
import { trimText } from '../common/format';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';

declare const fs;
declare const process;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  // HTML controls
  picture;
  gender: string;
  isActive: boolean;
  language;
  imgSrc;

  // HTML values
  student: IStudent = {
    id: '',
    firstName: '',
    initial: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    town: '',
    state: '',
    class: '',
    fatherName: '',
    motherName: '',
    emergencyContactName: '',
    emergencyContactPhoneNumber: '',
    emergencyRelationship: '',
    picture: '',
    gender: '',
    isActive: false,
  };

  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        save: '',
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
    delete: '',
  };

  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Edit Record',
        buttons: {
          save: 'Save',
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
      delete: 'Delete',
    },
    spanish: {
      toolbar: {
        title: 'Editar Record',
        buttons: {
          save: 'Grabar',
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
      delete: 'Borrar',
    },
  };

  constructor(
    public dbService: DatabaseService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public platform: Platform,
    public storage: Storage,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.student = { ...this.student, id: this.navParams.get('id') };
    try {
      const student = this.getStudentFromDB(this.student);
      if (student) {
        this.isActive = student.isActive;
        this.gender = student.gender;
        this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(student.picture);
        this.picture = student.picture;
        this.student = { ...student };
      }
    } catch (error) {
      handleError(error);
    }
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

  getStudentFromDB(student: IStudent): IStudent {
    try {
      return this.dbService.getStudentById(student.id);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteStudent(opts) {
    if (this.language === 'spanish') {
      const alert = await this.alertCtrl.create({
        header: '¡Advertencia!',
        message: '¿Estas seguro que quieres borrar este récord?',
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Si',
            handler: () => {
              let options: ISimpleAlertOptions = {
                header: '¡Éxito!',
                message: 'El estudiante fue borrado.',
              };
              // user has clicked the alert button
              // begin the alert's dismiss transition
              const navTransition = alert.dismiss();
              const response = {
                ...this.dbService.removeStudent(opts),
              };
              if (response.success === true) {
                options = {
                  ...options,
                  event: 'delete',
                };
                navTransition.then(() => this.showAdvancedAlert(options));
              } else {
                handleError(response.error);
                options = {
                  header: 'Error',
                  message:
                    'Hubo un error tratando de borrar este récord. Por favor trate de nuevo.',
                };
                navTransition.then(() => this.showAdvancedAlert(options));
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
        message: 'Are you sure you want to delete this record?',
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            handler: () => {
              let options: ISimpleAlertOptions = {
                header: 'Success!',
                message: 'Student was deleted.',
              };
              // user has clicked the alert button
              // begin the alert's dismiss transition
              const navTransition = alert.dismiss();
              const response = {
                ...this.dbService.removeStudent(opts),
              };
              if (response.success === true) {
                options = {
                  ...options,
                  event: 'delete',
                };
                navTransition.then(() => this.showAdvancedAlert(options));
              } else {
                handleError(response.error);
                options = {
                  header: 'Error',
                  message:
                    'There was an error trying to delete the record. Please try again.',
                };
                navTransition.then(() => this.showAdvancedAlert(options));
              }
              return false;
            },
          },
        ],
      });
      alert.present();
    }
  }

  async editStudent(opts: IStudent) {
    let options: ISimpleAlertOptions = { header: '', message: '', buttons: [] };
    if (!opts.firstName || !opts.lastName || !opts.id) {
      if (this.language === 'spanish') {
        options = {
          ...options,
          header: '¡Advertencia!',
          message: 'Algunos campos no están llenos.',
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
    } else {
      opts = {
        ...opts,
        phoneNumber: opts.phoneNumber,
        emergencyContactPhoneNumber: opts.emergencyContactPhoneNumber,
      };
      const picture = this.validatePicture({
        gender: this.gender,
        picture: this.picture,
      });
      const studentTrimmed: IStudent = {
        ...trimText(opts),
        picture: picture,
        gender: this.gender,
        isActive: this.isActive,
      };
      if (this.language === 'spanish') {
        const alert = await this.alertCtrl.create({
          header: '¡Advertencia!',
          message: `¿Estas seguro que quieres editar el récord de ${opts.firstName} ${opts.lastName}?`,
          buttons: [
            {
              text: 'No',
            },
            {
              text: 'Yes',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                const response = {
                  ...this.dbService.updateStudent(studentTrimmed),
                };
                if (response.success === true) {
                  navTransition.then(() => {
                    options = {
                      header: '¡Éxito!',
                      message: `${opts.firstName} ${opts.lastName} ha sido editado.`,
                    };
                    this.showAdvancedAlert(options);
                  });
                } else {
                  options = {
                    header: 'Error',
                    message: `Hubo un error tratando de editar el récord de ${opts.firstName} ${opts.lastName}. Por favor intente de nuevo.`,
                  };
                  navTransition.then(() => this.showAdvancedAlert(options));
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
          message: `Are you sure you want to edit ${opts.firstName} ${opts.lastName}'s record?`,
          buttons: [
            {
              text: 'No',
            },
            {
              text: 'Yes',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                const response = {
                  ...this.dbService.updateStudent(studentTrimmed),
                };
                if (response.success === true) {
                  navTransition.then(() => {
                    options = {
                      header: 'Success!',
                      message: `${opts.firstName} ${opts.lastName} record was edited.`,
                    };
                    this.showAdvancedAlert(options);
                  });
                } else {
                  options = {
                    header: 'Error',
                    message: `There was an error trying to edit the ${opts.firstName}'s record. Please try again.`,
                  };
                  navTransition.then(() => this.showAdvancedAlert(options));
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

  public validatePicture(opts: { gender: string; picture: string }) {
    if (opts.gender === 'male' && opts.picture === '') {
      opts.picture = './assets/profilePics/defaultMale.png';
    } else if (opts.gender === 'female' && opts.picture === '') {
      opts.picture = './assets/profilePics/defaultFemale.png';
    } else if (opts.gender === 'undisclosed' && opts.picture === '') {
      opts.picture = './assets/profilePics/defaultUndisclosed.png';
    }
    return opts.picture;
  }

  public async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: options.buttons,
    });
    alert.present();
  }

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
              if (options['event'] === 'delete') {
                this.modalCtrl.dismiss().then(() => this.navCtrl.pop());
              } else {
                this.modalCtrl.dismiss();
              }
            });
            return false;
          },
        },
      ],
    });
    alert.present();
  }
}
