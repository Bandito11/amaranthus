import { DomSanitizer } from '@angular/platform-browser';
import { OnInit, Component } from '@angular/core';
import { IStudent } from '../common/models';
import {
  AlertController,
  NavController,
  NavParams,
  Platform,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { handleError } from '../common/handleError';
import { trimText } from '../common/format';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';
import { toastController } from '@ionic/core';

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
    public sanitizer: DomSanitizer,
    public toastController: ToastController
  ) {}

  async ngOnInit() {
    this.student = { ...this.student, id: this.navParams.get('id') };
    try {
      const student = await this.getStudentFromDB(this.student);
      if (student) {
        this.isActive = student.isActive;
        this.gender = student.gender;
        this.imgSrc = student.picture;
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

  async getStudentFromDB(student: IStudent): Promise<IStudent> {
    try {
      return await this.dbService.getStudentById(student.id);
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
            handler: async () => {
              let message;
              await alert.dismiss();
              try {
                message = 'El estudiante fue borrado.';
                this.dbService.removeStudent(opts);
                const toast = await toastController.create({
                  message,
                  duration: 2000,
                  color: 'success',
                });
                await toast.present();
                this.modalCtrl.dismiss().then(() => this.navCtrl.pop());
              } catch (error) {
                message =
                  'Hubo un error tratando de borrar este récord. Por favor trate de nuevo.';
                handleError(message);
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
            handler: async () => {
              let message;
              await alert.dismiss();
              try {
                message = 'Student was deleted.';
                this.dbService.removeStudent(opts);
                const toast = await toastController.create({
                  message,
                  duration: 2000,
                  color: 'success',
                });
                await toast.present();
                await this.modalCtrl.dismiss().then(() => this.navCtrl.pop());
              } catch (error) {
                message =
                  'There was an error trying to delete the record. Please try again.';
                handleError(message);
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
    let message;
    if (!opts.firstName || !opts.lastName || !opts.id) {
      if (this.language === 'spanish') {
        message = 'Algunos campos no están llenos.';
      } else {
        message = "Some fields doesn't have the required info";
      }
      handleError(message);
    } else {
      opts = {
        ...opts,
        phoneNumber: opts.phoneNumber,
        emergencyContactPhoneNumber: opts.emergencyContactPhoneNumber,
      };
      const studentTrimmed: IStudent = {
        ...opts,
        ...trimText(opts),
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
              handler: async () => {
                let message;
                await alert.dismiss();
                try {
                  this.dbService.updateStudent(studentTrimmed),
                    (message = `${opts.firstName} ${opts.lastName} ha sido editado.`);

                  const toast = await this.toastController.create({
                    message,
                    duration: 2000,
                    color: 'success',
                  });
                  await toast.present();
                  await this.modalCtrl.dismiss();
                } catch (error) {
                  message = `Hubo un error tratando de editar el récord de ${opts.firstName} ${opts.lastName}. Por favor intente de nuevo.`;

                  handleError(error);
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
              handler: async () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                await alert.dismiss();
                try {
                  this.dbService.updateStudent(studentTrimmed);
                  message = `${opts.firstName} ${opts.lastName} record was edited.`;
                  const toast = await this.toastController.create({
                    message,
                    duration: 2000,
                    color: 'success',
                  });
                  await toast.present();
                  await this.modalCtrl.dismiss();
                } catch (error) {
                  message = `There was an error trying to edit the ${opts.firstName}'s record. Please try again.`;
                  handleError(error);
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

}
